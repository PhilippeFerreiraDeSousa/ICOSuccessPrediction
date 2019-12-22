##PACKAGES


##Packages
#install.packages("tidyr","stringr","comprehenr")

##LIBRARY
library(dplyr)
library(tidyr)
library(stringr)
library(comprehenr)

library(caret)
library(MASS)
library(caTools)
library(randomForest)
library(ggplot2)
library(GGally)
library(car)
library(rpart)
library(rattle)


#Functions
numextract <- function(string){ 
  return(str_extract(string, "\\-*\\d+\\.*\\d*"))
  
} 

cleanChar <- function(string){ 
  if (!is.na(string)){
    return(as.numeric(str_extract(string, "\\-*\\d+\\.*\\d*")))
  }
} 

conversion <- function(string){
  unit =str_extract(string, "[a-zA-Z]+" )
  if (!is.na(unit) && nchar(unit) !=0){
    factor <- switch (unit,
                      "Bn" = 10^9,
                      "MM" = 10^6,
                      "K" = 10^3)
    number =as.numeric(str_extract(string, "\\-*\\d+\\.*\\d*"))
    return (number*factor)
  }else{
    return (string)
  }
}



# LOAD DATA
past_fa <- read.csv("../ICOSuccessPrediction/python/coincheckup/coincheckup_10_months_fa.csv",header=T, na.strings=c("","NA"),stringsAsFactors=FALSE)
past_ia <-read.csv("../ICOSuccessPrediction/python/coincheckup/coincheckup_10_months_ia.csv",header=T, na.strings=c("","NA"),stringsAsFactors=FALSE)
current_fa <- read.csv("../ICOSuccessPrediction/python/coincheckup/coincheckup_current_fa.csv",header=T, na.strings=c("","NA"),stringsAsFactors=FALSE)
current_ia <- read.csv("../ICOSuccessPrediction/python/coincheckup/coincheckup_current_ia.csv",header=T, na.strings=c("","NA"),stringsAsFactors=FALSE)

#Remove the columns that are completely NA
current_fa$MCAP.BTC <- NULL
current_fa$X24h.Vol.BTC <- NULL
past_ia$Avg..Mkt..Cap <- NULL

#Solve problem with Github, merge the two columns and remove the characters
current_fa <- unite(current_fa, GitHub, c(GitHub, GitHub.1), remove=TRUE)
past_fa <- unite(past_fa, GitHub, c(GitHub, GitHub.1), remove=TRUE)
current_fa$GitHub <- lapply(current_fa$GitHub, function(x) sapply(x,numextract))
past_fa$GitHub <- lapply(past_fa$GitHub, function(x) sapply(x,numextract))

#Problem with the scrap in the first 100rows
# current_ia2<- current_ia
# print(current_ia2$Start.price[1:100] <- current_ia$Avg..Mkt..Cap[1:100])
# print(current_ia2[Price][1:100] <- current_ia$Mkt..Cap[1:100])
# current_ia2$CMGR....3mo[1:100]  <- current_ia$X24h.Vol [1:100]
# current_ia2$Avg..Mkt..Cap [1:100]  <- current_ia$Winning.months [1:100]
# current_ia2$Mkt..Cap [1:100]  <- current_ia$Avg..volume [1:100]
# current_ia2$X24h.Vol [1:100]  <- current_ia$ATH [1:100]
# current_ia2$Avg..volume [1:100]  <- current_ia$Start.price [1:100]
# current_ia2$Age..mo. [1:100]  <- current_ia$X..fm..ATH [1:100]
# current_ia2$Winning.months [1:100]  <- current_ia$ATH..BTC. [1:100]
# current_ia2$ATH [1:100]  <- current_ia$X..fm..ATH..BTC.[1:100]
# current_ia2$ATH..BTC. [1:100]  <- current_ia$CMGR....3mo [1:100]
# current_ia2$X..fm..ATH [1:100]  <- current_ia$Price [1:100]
# current_ia2$X..fm..ATH..BTC. [1:100]  <- current_ia$Cum..ROI [1:100]
# current_ia <- current_ia2
#Convert columns with the numbers and letters (K,MM,Bn) into numeric notation.


convertCF = c("Mkt..Cap", "X24h.Vol", "Circ..Supply")
convertCI = c("Mkt..Cap", "ATH")
convertPF = c("Mkt..Cap","MCAP.BTC","X24h.Vol","X24h.Vol.BTC", "Circ..Supply")
convertPI = c("Mkt..Cap","X24h.Vol")


invisible(to_vec(for(i in convertCF)  current_fa[i] <- lapply(current_fa[i], function(x) sapply(x,conversion))))
invisible(to_vec(for(i in convertCI)  current_ia[i] <- lapply(current_ia[i], function(x) sapply(x,conversion))))
invisible(to_vec(for(i in convertPF)  past_fa[i] <- lapply(past_fa[i], function(x) sapply(x,conversion))))
invisible(to_vec(for(i in convertPI)  past_ia[i] <- lapply(past_ia[i], function(x) sapply(x,conversion))))


current_fa$GitHub <- lapply(current_fa$GitHub, function(x) sapply(x,numextract))
past_fa$GitHub <- lapply(past_fa$GitHub, function(x) sapply(x,numextract))

##Remove all characters of the data (Put here the columns that are affected with this problem)
past_fa$X200d <- lapply(past_fa$X200d, function(x) sapply(x,cleanChar))
past_fa$X90d <- lapply(past_fa$X90d, function(x) sapply(x,cleanChar))

#Substitution of cells with --- to NA
current_fa <- data.frame(lapply(current_fa, function(x) { gsub("--|---",NA,x)}))
past_fa <- data.frame(lapply(past_fa, function(x) { gsub("--|---",NA,x)}))

##Lets remove the columns that are duplicated
#current
current_ia$Price <- NULL
current_ia$Mkt..Cap <- NULL
current_ia$X24h.Vol <- NULL
current_ia$Age..mo. <- NULL
current_ia$Winning.months <- NULL
current_fa$Avg..volume <- NULL
#past
past_ia$Price <- NULL
past_ia$Mkt..Cap <- NULL
past_ia$X24h.Vol <- NULL
past_ia$Age..mo. <- NULL
past_ia$Winning.months <- NULL
past_fa$Avg..volume <- NULL


#Merge of the data into 
df.past <- merge(past_fa,past_ia, by = "Name",stringsAsFactors=FALSE, numericAsFactors=FALSE)
df.current<- merge(current_fa, current_ia, by="Name",stringsAsFactors=FALSE, numericAsFactors=FALSE)

###FIX
#Problem with the column ATH that is a list type, we should to encode before writting in CSV
df.current$ATH <- vapply(df.current$ATH,paste,collapse=",",character(1L))

# #EXPORT dataset
write.csv(df.past,file = "10months_IA_FA_.csv")
write.csv(df.current,file = "current_IA_FA_.csv")

df.past <- read.csv(file = "10months_IA_FA_.csv",stringsAsFactors=FALSE)
df.current <- read.csv(file = "current_IA_FA_.csv",stringsAsFactors=FALSE)

sapply(df.current, class)
sapply(df.past, class)


# Remove duplicated rows based on Sepal.Length
df.current <- df.current %>% distinct(Name, .keep_all = TRUE)

##Remove the variable generated in the load
df.past$X <- NULL
df.current$X <-NULL

##Prices of the BTC that correspond with the the date of the data
priceBTC_current <- 7486.29
priceBTC_10month <- 7920.90

#Add _past to the columns of the past data (except Name, that is going to be the column used to merge the two datasets)
colnames(df.past) <- paste(colnames(df.past), "past", sep = "_")
df.past$Name <- df.past$Name_past
df.past$Name_past <- NULL


## remove comma from the numbers
df.past$Price_past <- as.numeric(gsub(",","",df.past$Price_past))
df.current$Price <- as.numeric(gsub(",","",df.current$Price))
df.past$Circ..Supply_past <- as.numeric(gsub(",","",df.past$Circ..Supply_past))
df.current$Circ..Supply <- as.numeric(gsub(",","",df.current$Circ..Supply))
df.past$Max..Supply_past <- as.numeric(gsub(",","",df.past$Max..Supply_past))
df.current$Max..Supply <- as.numeric(gsub(",","",df.current$Max..Supply))
#######


sapply(df.past, class)
sapply(df.current, class)
# We modify Mkt because the sensibility of the variable Mkt.BTC is not good and there a lot of 0.
df.past$Mkt.BTC_c  <- df.past$Mkt..Cap /priceBTC_10month
df.current$Mkt.BTC_c  <- df.current$Mkt..Cap /priceBTC_current


### We merge in an unique dataset (not used for the moment)
df.all <- merge(df.past,df.current, by="Name")
#######

##We create the final dataset with only the variables that appear in the two dataset
common1 <- intersect(df.current$Name, df.past$Name)  

 df.current_match <- df.current%>%
  filter(Name %in% common1) 
 
 df.past_match <- df.past%>%
   filter(Name %in% common1) 
 

##Modify prices (Sensibility problem)
 df.current_match$BTC <- as.numeric(paste(df.current_match$Price))/as.numeric(priceBTC_current)
 df.past_match$BTC_past <- as.numeric(paste(df.past_match$Price_past))/as.numeric(priceBTC_10month)
##

## We create the independent variable that is the price difference (BTC) between 8-months ago and now 
df.past_match$growth8mth <- (df.current_match$BTC - df.past_match$BTC_past)

# ##We export result
# write.csv(df.current_match,file = "real_current_data.csv")
# write.csv(df.past_match,file = "real_past_data.csv")

df <- df.past_match

##MODEL###


df$BTCprice_change <- ((df.current_match$BTC)-(df$BTC_past))*100/df$BTC_past
df$BTCmcap_change <- ((df.current_match$Mkt.BTC_c)-(df$Mkt.BTC_c))*100/df$Mkt.BTC_c


df <- df %>% mutate(success = ifelse(BTCprice_change >= 30 & BTCmcap_change > 0 , 1, 0))



##########

change <- names(df) [5:8]

change <-c("X30d_past","X45d_past","X90d_past","X200d_past","CMGR....3mo_past","Cum..ROI_past","Winning.months_past","Age..mo._past")
change


for (i in change) {
  df[i] <- lapply(df[i], function(x) as.numeric(as.character(x)))
}

##DEAL MISSING VALUES
#df[is.na(df)] = 0
###REMOVE USELESS DATA

df$X <- NULL
df$X.1 <- NULL
df$X1h_past <- NULL
df$X24h_past <- NULL
df$X7d_past <- NULL
df$X14d_past <- NULL
df$X24h.Vol_past <- NULL
df$X24h.Vol.BTC_past <- NULL
df$Total.Supply_past <- as.numeric(gsub(",","",df$Total.Supply_past))


#  success as factor variables
df$success <- as.factor(df$success)


write.csv(file = "dataset.csv",df)
write.csv(file = "dataset_new.csv",x = df.current_match)




