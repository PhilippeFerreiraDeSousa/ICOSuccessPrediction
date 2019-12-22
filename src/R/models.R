##PACKAGES


##LIBRARY

library(caret)
library(MASS)
library(caTools)
library(randomForest)
library(ggplot2)
library(GGally)
library(car)
library(rpart)
library(rattle)
library(boot)
library(dplyr)
library(ROCR)


mean_squared_error <- function(responses, predictions) {
  MSE <- mean(((responses - predictions))^2)
  return(MSE)
}

mean_absolute_error <- function(responses, predictions) {
  MAE <- mean(abs(responses - predictions))
  return(MAE)
}

OS_R_squared <- function(responses, predictions, train_responses) {
  baseline <- mean(train_responses)
  SSE <- sum((responses - predictions)^2)
  SST <- sum((responses - baseline)^2)
  r2 <- 1 - SSE/SST
  return(r2)
}

all_metrics <- function(responses, predictions, train_responses) {
  #filter_vec = !is.na(responses) & !is.na(predictions)
  #responses <- responses[filter_vec]
  #predictions <- predictions[filter_vec]
  #train_responses <- train_responses[filter_vec]
  mse <- mean_squared_error(responses, predictions)
  mae <- mean_absolute_error(responses, predictions)
  OSR2 <- OS_R_squared(responses, predictions, train_responses)
  return(c(mse, mae, OSR2))
}

tableAccuracy <- function(label, pred) {
  t = table(label, pred)
  a = sum(diag(t))/length(label)
  return(a)
}

tableTPR <- function(label, pred) {
  t = table(label, pred)
  return(t[2,2]/(t[2,1] + t[2,2]))
}

tableFPR <- function(label, pred) {
  t = table(label, pred)
  return(t[1,2]/(t[1,1] + t[1,2]))
}

##LOAD DATA


df <- read.csv("../python/coincheckup/dataset.csv", stringsAsFactors=FALSE, na="")
df$label_disappeared = as.factor(df$label_disappeared)
# name and Symbol are the only strings

##MODELS

set.seed(42)
split = sample.split(df$label_disappeared, SplitRatio = 0.7)
train_data <- filter(df, split== TRUE)
test_data <- filter(df, split== FALSE)

table(train_data$label_disappeared)
table(test_data$label_disappeared)

#LOGISTIC
logistic <- glm(label_disappeared ~ Price + X1h + X24h + X7d + X14d + X30d + X45d + X90d + X200d + 
                  Mkt..Cap + X24h.Vol + Circ..Supply + Total.Supply + Team + Product + Coin + Social + Communication + Business + Avg..volume + Age..mo., data = train_data, family="binomial")
# . -Name -Symbol -BTC -MC.. -MCAP.BTC -X24h.Vol.BTC -Max..Supply -label_Price -label_Price -label_Mkt..Cap -label_growth_rate_Price -label_growth_rate_Mkt..Cap -GitHub -GitHub.1 -Advisors -Brand.Buzz
summary(logistic)

pred = predict(logistic, newdata = test_data, type="response")

table(test_data$label_disappeared, pred>0.2)

tableAccuracy(test_data$label_disappeared, pred>0.2)
tableTPR(test_data$label_disappeared, pred>0.2)
tableFPR(test_data$label_disappeared, pred>0.2)

vif(logistic)

#########

logistic <- glm(label_disappeared ~ X45d + Social + 0, data = train_data, family="binomial")
summary(logistic)

pred = predict(logistic, newdata = test_data, type="response")

table(test_data$label_disappeared, pred>0.2)

tableAccuracy(test_data$label_disappeared, pred>0.2)
tableTPR(test_data$label_disappeared, pred>0.2)
tableFPR(test_data$label_disappeared, pred>0.2)

# Baseline accuracy:
t_ <- table(test_data$label_disappeared)
t_[1]/sum(t_)

rocr.pred <- prediction(pred, test_data$label_disappeared)
perf <- performance(rocr.pred, "tpr", "fpr")
plot(perf, colorize = TRUE)
abline(0, 1)
as.numeric(performance(rocr.pred, "auc")@y.values)

# Random forest
set.seed(42)
mod.rf <- randomForest(CTR ~ ., data = train.ctr, mtry = 5, nodesize = 5, ntree = 500)

pred.rf <- predict(mod.rf, newdata = test.ctr) # just to illustrate

#####
set.seed(42)
test_data_filled_with_0 <- test_data
test_data_filled_with_0[is.na(test_data_filled_with_0)] <- 0
train_data.mm = as.data.frame(model.matrix(label_disappeared ~ X24h + X14d + X45d + Social + Mkt..Cap + Age..mo. + Business, data = train_data)) 
test_data.mm = as.data.frame(model.matrix(label_disappeared ~ X24h + X14d + X45d + Social + Mkt..Cap + Age..mo. + Business, data = test_data_filled_with_0)) 

# Imbalanced data: can't use accuracy
sapply(df, function(x){ sum(is.na(x)) })

# X30d + X45d + X90d + X200d + Total.Supply + Age..mo.
# 4      11     22     48      9              1

train.rf <- train(label_disappeared ~ X24h + X14d + X45d + Social + Mkt..Cap + Age..mo. + Business,
                  data = train_data,
                  method = "rf",
                  na.action  = na.omit,
                  tuneGrid = data.frame(mtry=1:7),
                  trControl = trainControl(method="cv", number=5, verboseIter = TRUE, summaryFunction = f1),
                  metric = "Accuracy")
train.rf$results
train.rf
best.rf <- train.rf$finalModel
pred.rf <- predict(best.rf, newdata = test_data.mm) # can use same model matrix

ggplot(train.rf$results, aes(x = mtry, y = F1)) + geom_point(size = 3) + 
  ylab("CV Accuracy") + theme_bw() + theme(axis.title=element_text(size=18), axis.text=element_text(size=18))


f1 <- function (data, lev = NULL, model = NULL) {
  pred <- data$pred[!is.na(data$pred)&!is.na(data$obs)]
  obs <- data$obs[!is.na(data$pred)&!is.na(data$obs)]
  precision <- posPredValue(pred, obs, positive = lev[2])
  recall  <- sensitivity(pred, obs, postive = lev[1])
  f1_val <- (2 * precision * recall) / (precision + recall)
  names(f1_val) <- c("F1")
  print(precision)
  print(recall)
  print(f1_val)
  f1_val
}

train.rf <- train(label_disappeared ~ X24h + X14d + X45d + Social + Mkt..Cap + Age..mo. + Business,
                  data = train_data,
                  method = "rf",
                  na.action  = na.omit,
                  tuneGrid = data.frame(mtry=1:7),
                  trControl = trainControl(method="cv", number=5, verboseIter = TRUE, summaryFunction = f1),
                  metric = "F1")
train.rf$results
train.rf
best.rf <- train.rf$finalModel
pred.rf <- predict(best.rf, newdata = test_data.mm) # can use same model matrix

ggplot(train.rf$results, aes(x = mtry, y = F1)) + geom_point(size = 3) + 
  ylab("CV F1") + theme_bw() + theme(axis.title=element_text(size=18), axis.text=element_text(size=18))

###

# 2 - Balancing by sampling stratification
for (mtry in seq(1, 5, by=2)) {
  set.seed(42)
  rare.class.prevalence = 0.2
  nRareSamples = 1000 * rare.class.prevalence
  mod.rf <- randomForest(label_disappeared ~ X24h + X14d + X45d + Social + Mkt..Cap + Age..mo. + Business, data = train_data, mtry = mtry, nodesize = 5, ntree = 1000,strata=train_data$label_disappeared,
                         sampsize=c(nRareSamples,nRareSamples), na.action = na.omit)
  # print(mod.rf)
  
  pred.rf <- predict(mod.rf, newdata = test_data)
  
  print(table(test_data$label_disappeared, pred.rf))
  
  print(tableAccuracy(test_data$label_disappeared, pred.rf))
  print(tableTPR(test_data$label_disappeared, pred.rf))
  print(tableFPR(test_data$label_disappeared, pred.rf))
}

###
# Boosting

tGrid = expand.grid(n.trees = (1:10)*1000, interaction.depth = c(1,2,4,6,8,10),
                    shrinkage = 0.001, n.minobsinnode = 10)

set.seed(42)
train.boost <- train(label_disappeared ~ X24h + X14d + X45d + Social + Mkt..Cap + Age..mo. + Business,
                     data = train_data,
                     method = "gbm",   ## gradient boosting machine 
                     tuneGrid = tGrid,
                     trControl = trainControl(method="cv", number=5, verboseIter = TRUE),
                     metric = "Accuracy",
                     na.action = na.omit)
train.boost
best.boost <- train.boost$finalModel

ggplot(train.boost$results, aes(x = n.trees, y = Accuracy, colour = as.factor(interaction.depth))) + geom_line() + 
  ylab("CV Accuracy") + theme_bw() + theme(axis.title=element_text(size=18), axis.text=element_text(size=18)) + 
  scale_color_discrete(name = "interaction.depth")

pred.best.boost <- predict(best.boost, newdata = test_data.mm, n.trees = 2000)# from CV plot

table(test_data$label_disappeared, pred.best.boost>0.7)

tableAccuracy(test_data$label_disappeared, pred.best.boost>0.7)
tableTPR(test_data$label_disappeared, pred.best.boost>0.7)
tableFPR(test_data$label_disappeared, pred.best.boost>0.7)

# Regression

set.seed(42)
split = sample.split(df$label_growth_rate_Price, SplitRatio = 0.7)
price_train_data <- filter(df, split== TRUE)
price_test_data <- filter(df, split== FALSE)

price_train_data = price_train_data %>% filter(as.integer(label_disappeared)==1)# we keep label_disappeared=FALSE
price_test_data = price_test_data %>% filter(as.integer(label_disappeared)==1)

mod <- lm(label_growth_rate_Price ~ Price + X1h + X24h + X7d + X14d + X30d + X45d + X90d + X200d + 
            Mkt..Cap + X24h.Vol + Circ..Supply + Total.Supply + Team + Product + Coin + Social + Communication + Business + Avg..volume + Age..mo., data = price_train_data)

summary(mod)

pred_lm = predict(mod, newdata = price_test_data)

all_metrics(price_test_data$label_growth_rate_Price, pred_lm, price_train_data$label_growth_rate_Price)

mod <- lm(label_growth_rate_Price ~ Circ..Supply + Total.Supply + 0, data = price_train_data)

summary(mod)

pred_lm = predict(mod, newdata = price_test_data)

all_metrics(price_test_data$label_growth_rate_Price, pred_lm, price_train_data$label_growth_rate_Price)

# Compute money earned in case where we invest a size proportionnal to the predicted growth rate
filter_vec = !is.na(pred_lm)
sum((pred_lm*price_test_data$label_growth_rate_Price)[filter_vec])/sum(pred_lm[filter_vec])

# Baseline
sum(price_test_data$label_growth_rate_Price[filter_vec])/length(price_test_data$label_growth_rate_Price[filter_vec])

############ log model

df$price_log_diff = log(df$label_Price) - log(df$Price)# follow mu T + sigma B_T

split = sample.split(df$price_log_diff, SplitRatio = 0.7)
price_train_data <- filter(df, split== TRUE)
price_test_data <- filter(df, split== FALSE)

price_train_data = price_train_data %>% filter(as.integer(label_disappeared)==1)# we keep label_disappeared=FALSE
price_test_data = price_test_data %>% filter(as.integer(label_disappeared)==1)

mod_log <- lm(price_log_diff ~ Price + X1h + X24h + X7d + X14d + X30d + X45d + X90d + X200d + 
            Mkt..Cap + X24h.Vol + Circ..Supply + Total.Supply + Team + Product + Coin + Social + Communication + Business + Avg..volume + Age..mo., data = price_train_data)

summary(mod_log)

pred_lm = predict(mod_log, newdata = price_test_data)

all_metrics(price_test_data$price_log_diff, pred_lm, price_train_data$price_log_diff)

mod_log <- lm(price_log_diff ~ X7d + Mkt..Cap + Age..mo., data = price_train_data)

summary(mod_log)

pred_lm_log = predict(mod_log, newdata = price_test_data)

all_metrics(price_test_data$price_log_diff, pred_lm_log, price_train_data$price_log_diff)

# Compute money earned in case where we invest a size proportionnal to the predicted growth rate
filter_vec = !is.na(pred_lm_log)
sum((exp(pred_lm_log)*price_test_data$label_growth_rate_Price)[filter_vec])/sum(exp(pred_lm_log)[filter_vec])

# Baseline
sum(price_test_data$label_growth_rate_Price[filter_vec])/length(price_test_data$label_growth_rate_Price[filter_vec])

# Random forest
price_test_data_filled_with_0 <- price_test_data
price_test_data_filled_with_0[is.na(price_test_data_filled_with_0)] <- 0
price_test_data_log.mm = as.data.frame(model.matrix(price_log_diff ~ X24h + X7d + X200d + Mkt..Cap + Age..mo. + Business, data = price_test_data_filled_with_0))

train.rf <- train(price_log_diff ~ X24h + X7d + X200d + Mkt..Cap + Age..mo. + Business,
                  data = price_train_data,
                  method = "rf",
                  na.action  = na.omit,
                  tuneGrid = data.frame(mtry=1:6),
                  trControl = trainControl(method="cv", number=5, verboseIter = TRUE),
                  distribution = "gaussian",
                  metric = "RMSE")
train.rf$results
train.rf
best.rf <- train.rf$finalModel
pred.rf <- predict(best.rf, newdata = price_test_data_log.mm)
all_metrics(price_test_data$price_log_diff, pred.rf, price_train_data$price_log_diff)

ggplot(train.rf$results, aes(x = mtry, y = Rsquared)) + geom_point(size = 3) + 
  ylab("CV Rsquared") + theme_bw() + theme(axis.title=element_text(size=18), axis.text=element_text(size=18))

#Boosting

tGrid = expand.grid(n.trees = (1:10)*1000, interaction.depth = c(1,2,4,6,8,10),
                    shrinkage = 0.001, n.minobsinnode = 10)

set.seed(42)
train.boost <- train(price_log_diff ~ X24h + X7d + X200d + Mkt..Cap + Age..mo. + Business,
                     data = price_train_data,
                     method = "gbm",   ## gradient boosting machine 
                     tuneGrid = tGrid,
                     trControl = trainControl(method="cv", number=5, verboseIter = TRUE),
                     distribution = "gaussian",
                     metric = "RMSE",
                     na.action = na.omit)
train.boost
best.boost <- train.boost$finalModel

ggplot(train.boost$results, aes(x = n.trees, y = Rsquared, colour = as.factor(interaction.depth))) + geom_line() + 
  ylab("CV Rsquared") + theme_bw() + theme(axis.title=element_text(size=18), axis.text=element_text(size=18)) + 
  scale_color_discrete(name = "interaction.depth")

pred.best.boost <- predict(best.boost, newdata = price_test_data_log.mm, n.trees = 10000)# from CV plot

# all_metrics(price_test_data$price_log_diff, pred.best.boost, price_train_data$price_log_diff)

library(gbm)

mod.boost <- gbm(price_log_diff ~ X24h + X7d + X200d + Mkt..Cap + Age..mo. + Business,
                 data = price_train_data,
                 distribution = "gaussian",
                 n.trees = 10000,
                 shrinkage = 0.001,
                 interaction.depth = 10)

# NOTE: we need to specify number of trees to get a prediction for boosting
pred.boost <- predict(mod.boost, newdata = price_test_data_log.mm, n.trees=10000)

all_metrics(price_test_data$price_log_diff, pred.boost, price_train_data$price_log_diff)
