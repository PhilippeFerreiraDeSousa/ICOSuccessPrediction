(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["aws-sdk"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("aws-sdk"));
  } else {
    factory(root["AWS"]);
  }
}(this, function (AWS) {

/**
 * Copyright 2014 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 * 
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 * 
 *     http://aws.amazon.com/asl/
 * 
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License. 
 */


if(void 0===AWS)throw new Error("AWS SDK must be loaded before loading the Sync Manager.");AWS.CognitoSyncManager=function(a){a=a||{};var b="CognitoJavaScriptSDK/1";this.provider=AWS.config.credentials,this.identityPoolId=this.provider.params.IdentityPoolId,this.region=AWS.config.region,this.logger=a.log,"function"!=typeof this.logger&&(this.logger=function(){}),this.local=new AWS.CognitoSyncManager.LocalStorage({DataStore:a.DataStore?a.DataStore:AWS.CognitoSyncManager.StoreLocalStorage}),this.remote=new AWS.CognitoSyncManager.RemoteStorage(this.identityPoolId,this.provider),this.remote.setUserAgent(b)},AWS.CognitoSyncManager.prototype.openOrCreateDataset=function(a,b){var c=this,d=new RegExp("^[a-zA-Z0-9_.:-]{1,128}$");d.test(a)?this.local.createDataset(this.getIdentityId(),a,function(a,d){return a?b(a,null):void b(null,new AWS.CognitoSyncManager.Dataset(d,c.provider,c.local,c.remote,c.logger))}):b(new Error("Dataset name must match the pattern "+d.toString()))},AWS.CognitoSyncManager.prototype.listDatasets=function(a){this.local.getDatasets(this.getIdentityId(),a)},AWS.CognitoSyncManager.prototype.refreshDatasetMetadata=function(a){var b=this;this.remote.getDatasets(function(c,d){var e=[],f=function(a){b.local.updateDatasetMetadata(b.getIdentityId(),a,g)},g=function(b,c){e.push(c),d.length>0?f(d.shift()):a(null,e)};d.length>0?f(d.shift(),a):a(null,[])})},AWS.CognitoSyncManager.prototype.wipeData=function(){this.provider.clearCachedId(),this.local.wipeData()},AWS.CognitoSyncManager.prototype.getIdentityId=function(){return this.provider.identityId},AWS=AWS||{},AWS.CognitoSyncManager=AWS.CognitoSyncManager||{},AWS.CognitoSyncManager.Conflict=function(){var a=function(a,b){if(!a||!b)throw new Error("Remote and local records cannot be null.");if(!a.getKey||!b.getKey)throw new Error("Records are not record objects.");if(a.getKey()!==b.getKey())throw new Error("Remote and local keys do not match.");this.key=a.getKey(),this.remoteRecord=a,this.localRecord=b};return a.prototype.getKey=function(){return this.key},a.prototype.getRemoteRecord=function(){return this.remoteRecord},a.prototype.getLocalRecord=function(){return this.localRecord},a.prototype.resolveWithRemoteRecord=function(){return this.remoteRecord.setModified(!1),this.remoteRecord},a.prototype.resolveWithLocalRecord=function(){return this.localRecord.setSyncCount(this.remoteRecord.getSyncCount()),this.localRecord.setModified(!0),this.localRecord},a.prototype.resolveWithValue=function(a){return new AWS.CognitoSyncManager.Record({Key:this.remoteRecord.getKey(),Value:a,SyncCount:this.remoteRecord.getSyncCount(),LastModifiedDate:new Date,LastModifiedBy:this.localRecord.getLastModifiedBy(),DeviceLastModifiedDate:new Date,Modified:!0})},a}(),AWS=AWS||{},AWS.CognitoSyncManager=AWS.CognitoSyncManager||{},AWS.CognitoSyncManager.Dataset=function(){var a=function(a,b,c,d,e){this.MAX_RETRY=3,this.datasetName=a,this.provider=b,this.local=c,this.remote=d,this.logger=e||function(){}};return a.prototype.validateKey=function(a){var b=new RegExp("^[a-zA-Z0-9_.:-]{1,128}$");return b.test(a)},a.prototype.put=function(a,b,c){var d=typeof b;return this.validateKey(a)?"string"!==d?c(new Error("The value type must be a string but was "+d+".")):void this.local.putValue(this.getIdentityId(),this.datasetName,a,b,c):c(new Error("Invalid key."))},a.prototype.remove=function(a,b){return this.validateKey(a)?void this.local.putValue(this.getIdentityId(),this.datasetName,a,null,b):b(new Error("Invalid key."))},a.prototype.get=function(a,b){return this.validateKey(a)?void this.local.getValue(this.getIdentityId(),this.datasetName,a,b):b(new Error("Invalid key."))},a.prototype.getAllRecords=function(a){this.local.getRecords(this.getIdentityId(),this.datasetName,a)},a.prototype.getDataStorage=function(a){this.getDatasetMetadata(function(b,c){return b?a(b):c?a(null,c.getDataStorage()):a(null,0)})},a.prototype.isChanged=function(a,b){return this.validateKey(a)?void this.local.getRecord(this.getIdentityId(),this.datasetName,a,function(a,c){b(null,c&&c.isModified())}):b(new Error("Invalid key."))},a.prototype.getDatasetMetadata=function(a){this.local.getDatasetMetadata(this.getIdentityId(),this.datasetName,a)},a.prototype.resolve=function(a,b){this.local.putRecords(this.getIdentityId(),this.datasetName,a,b)},a.prototype.putAll=function(a,b){var c=!0;for(var d in a)a.hasOwnProperty(d)&&(this.validateKey(d)||(c=!1));return c?void this.local.putAllValues(this.getIdentityId(),this.datasetName,a,b):b(new Error("Object contains invalid keys."))},a.prototype.getAll=function(a){var b,c={};this.local.getRecords(this.getIdentityId(),this.datasetName,function(d,e){if(d)return a(d);for(var f in e)e.hasOwnProperty(f)&&(b=e[f],b.isDeleted()||(c[b.getKey()]=b.getValue()));a(null,c)})},a.prototype.getIdentityId=function(){return this.provider.identityId},a.prototype.getModifiedRecords=function(a){this.local.getModifiedRecords(this.getIdentityId(),this.datasetName,a)},a.prototype.getLocalMergedDatasets=function(a){var b,c=[],d=this.datasetName+".";this.local.getDatasets(this.getIdentityId(),function(e,f){for(var g in f)f.hasOwnProperty(g)&&(b=f[g],0===b.getDatasetName().indexOf(d)&&c.push(b.getDatasetName()));a(null,c)})},a.prototype.synchronize=function(a,b){var c=this;return a=a||{},a.onSuccess=a.onSuccess||function(a,b){},a.onFailure=a.onFailure||function(a){},a.onConflict=a.onConflict||function(a,b,c){return c(!1)},a.onDatasetDeleted=a.onDatasetDeleted||function(a,b,c){return c(!1)},a.onDatasetsMerged=a.onDatasetsMerged||function(a,b,c){return c(!1)},void 0===b&&(b=this.MAX_RETRY),c.logger("Starting synchronization... (retries: "+b+")"),b<0?a.onFailure(new Error("Synchronize failed: exceeded maximum retry count.")):void this.getLocalMergedDatasets(function(d,e){return d&&a.onFailure(d),c.logger("Checking for locally merged datasets... found "+e.length+"."),e.length>0?(c.logger("Deferring to .onDatasetsMerged."),a.onDatasetsMerged(c,e,function(d){return d?c.synchronize(a,--b):a.onFailure(new Error("Synchronization cancelled by onDatasetsMerged() callback returning false."))})):void c.local.getLastSyncCount(c.getIdentityId(),c.datasetName,function(d,e){return d?a.onFailure(d):(c.logger("Detecting last sync count... "+e),void(parseInt(e)===-1?c.remote.deleteDataset(c.datasetName,function(b,d){return b?a.onFailure(b):void c.local.purgeDataset(c.getIdentityId(),c.datasetName,function(b){return b?a.onFailure(b):a.onSuccess(c)})}):c.remote.listUpdates(c.datasetName,e,function(d,f){if(d)return a.onFailure(d);c.logger("Fetching remote updates... found "+f.records.length+".");var g=f.getMergedDatasetNameList();if(c.logger("Checking for remote merged datasets... found "+g.length+"."),g.length>0)return c.logger("Deferring to .onDatasetsMerged."),a.onDatasetsMerged(c,g,function(d){d?c._synchronizeInternal(a,--b):a.onFailure(new Error("Cancelled due to .onDatasetsMerged result."))});if(0!==e&&!f||f.isDeleted())return a.onDatasetDeleted(c,f.getDatasetName(),function(d){return c.logger("Dataset should be deleted. Deferring to .onDatasetDeleted."),d?(c.logger(".onDatasetDeleted returned true, purging dataset locally."),c.local.purgeDataset(c.getIdentityId(),c.datasetName,function(d){return d?a.onFailure(d):c._synchronizeInternal(a,--b)})):(c.logger(".onDatasetDeleted returned false, cancelling sync."),a.onFailure(new Error("Cancelled due to .onDatasetDeleted result.")))});var h=f.getRecords(),i=f.getSyncCount(),j=f.getSyncSessionToken();c.logger("Checking for remote updates since last sync count... found "+h.length+"."),h.length>0?c._synchronizeResolveLocal(h,function(d,f){return d?a.onFailure(d):(c.logger("Checking for conflicts... found "+f.length+"."),void(f.length>0?(c.logger("Conflicts detected. Deferring to .onConflict."),a.onConflict(c,f,function(d){return d?void c._synchronizePushRemote(j,e,function(){return c.synchronize(a,--b)}):(c.logger(".onConflict returned false. Cancelling sync."),a.onFailure(new Error("Sync cancelled. Conflict callback returned false.")))})):(c.logger("No conflicts. Updating local records."),c.local.putRecords(c.getIdentityId(),c.datasetName,h,function(d){return d?a.onFailure(d):void c.local.updateLastSyncCount(c.getIdentityId(),c.datasetName,i,function(d){return d?a.onFailure(d):(c.logger("Finished resolving records. Restarting sync."),c.synchronize(a,--b))})}))))}):(c.logger("Nothing updated remotely. Pushing local changes to remote."),c._synchronizePushRemote(j,i,function(d){return d?(c.logger("Remote push failed. Likely concurrent sync conflict. Retrying..."),c.synchronize(a,--b)):(c.logger("Sync successful."),a.onSuccess(c,h))}))})))})})},a.prototype._synchronizeResolveLocal=function(a,b){var c=this,d=[];return a&&a.length>0?void c.local.getRecords(c.getIdentityId(),c.datasetName,function(c,e){var f,g,h,i={};for(f=0;f<e.length;f++)i[e[f].getKey()]=e[f];for(f=0;f<a.length;f++)g=a[f].getKey(),h=i[g],h&&h.isModified()&&h.getValue()!==a[f].getValue()&&d.push(new AWS.CognitoSyncManager.Conflict(a[f],h));return b(null,d)}):b(null,d)},a.prototype._synchronizePushRemote=function(a,b,c){var d=this;this.getModifiedRecords(function(b,e){return e.length>0?void d.remote.putRecords(d.datasetName,e,a,function(a,b){a&&c(a),d.local.putRecords(d.getIdentityId(),d.datasetName,b,function(a){if(a)return c(a);var e=0;for(var f in b)b.hasOwnProperty(f)&&(e=e<b[f].getSyncCount()?b[f].getSyncCount():e);d.local.updateLastSyncCount(d.getIdentityId(),d.datasetName,e,function(a){return a?c(a):c(null,!0)})})}):c(null,!0)})},a}(),AWS=AWS||{},AWS.CognitoSyncManager=AWS.CognitoSyncManager||{},AWS.CognitoSyncManager.DatasetMetadata=function(){var a=function(a){if(a=a||{},this.datasetName=a.DatasetName||"",this.creationDate=new Date(a.CreationDate)||new Date,this.lastModifiedDate=new Date(a.LastModifiedDate)||new Date,this.lastModifiedBy=a.LastModifiedBy||"",this.dataStorage=a.DataStorage||0,this.recordCount=a.NumRecords||0,this.lastSyncCount=a.LastSyncCount||0,this.lastSyncDate=a.LastSyncDate?new Date(a.LastSyncDate):new Date,this.dataStorage<0)throw new RangeError("Storage size cannot be negative.");if(this.recordCount<0)throw new RangeError("Record count cannot be negative.")};return a.prototype.getDatasetName=function(){return this.datasetName},a.prototype.setDatasetName=function(a){return this.datasetName=a,this},a.prototype.getCreationDate=function(){return this.creationDate},a.prototype.setCreationDate=function(a){return this.creationDate=new Date(a),this},a.prototype.getLastModifiedDate=function(){return this.lastModifiedDate},a.prototype.setLastModifiedDate=function(a){return this.lastModifiedDate=new Date(a),this},a.prototype.getLastModifiedBy=function(){return this.lastModifiedBy},a.prototype.setLastModifiedBy=function(a){return this.lastModifiedBy=a,this},a.prototype.getDataStorage=function(){return this.dataStorage},a.prototype.setDataStorage=function(a){return this.dataStorage=a,this},a.prototype.getRecordCount=function(){return this.recordCount},a.prototype.setRecordCount=function(a){return this.recordCount=a,this},a.prototype.getLastSyncCount=function(){return this.lastSyncCount},a.prototype.setLastSyncCount=function(a){return this.lastSyncCount=a,this},a.prototype.getLastSyncDate=function(){return this.lastSyncDate},a.prototype.setLastSyncDate=function(a){return this.lastSyncDate=a,this},a.prototype.toString=function(){return JSON.stringify(this.toJSON())},a.prototype.toJSON=function(){return{DatasetName:this.datasetName,CreationDate:this.creationDate,LastModifiedDate:this.lastModifiedDate,LastModifiedBy:this.lastModifiedBy,DataStorage:this.dataStorage,NumRecords:this.recordCount,LastSyncCount:this.lastSyncCount,LastSyncDate:this.lastSyncDate}},a}(),AWS=AWS||{},AWS.CognitoSyncManager=AWS.CognitoSyncManager||{},AWS.CognitoSyncManager.DatasetUpdates=function(){var a=function(a){this.datasetName=a,this.records=[],this.syncCount=0,this.syncSessionToken="",this.exists=!0,this.deleted=!1,this.mergedDatasetNameList=[]};return a.prototype.getDatasetName=function(){return this.datasetName},a.prototype.setDatasetName=function(a){return this.datasetName=a,this},a.prototype.getRecords=function(){return this.records},a.prototype.addRecord=function(a){return this.records.push(a),this},a.prototype.getSyncCount=function(){return this.syncCount},a.prototype.setSyncCount=function(a){return this.syncCount=a,this},a.prototype.getSyncSessionToken=function(){return this.syncSessionToken},a.prototype.setSyncSessionToken=function(a){return this.syncSessionToken=a,this},a.prototype.isExists=function(){return this.exists},a.prototype.setExists=function(a){return this.exists=a,this},a.prototype.isDeleted=function(){return this.deleted},a.prototype.setDeleted=function(a){return this.deleted=a,this},a.prototype.getMergedDatasetNameList=function(){return this.mergedDatasetNameList},a.prototype.setMergedDatasetNameList=function(a){return this.mergedDatasetNameList=a,this},a}(),AWS=AWS||{},AWS.CognitoSyncManager=AWS.CognitoSyncManager||{},AWS.CognitoSyncManager.LocalStorage=function(){var a=function(a){a=a||{},this.store=null,this.meta=null,a.DataStore?this.store=new a.DataStore:this.store=new AWS.CognitoSyncManager.StoreInMemory};return a.prototype.getMetadataKey=function(a,b){return a+"."+b},a.prototype.loadMetadataCache=function(a,b){var c=this;this.store.get("_internal","_metadata",a,function(a,d){return a?b(a,null):(d||(d={}),c.meta=d,void b(null,d))})},a.prototype.saveMetadataCache=function(a,b,c){this.store.set("_internal","_metadata",a,b,function(a){return a?c(a):c(null,b)})},a.prototype.createDataset=function(a,b,c){var d=this;return this.getDatasetMetadata(a,b,function(e,f){var g=(new Date).getTime();f?c(null,b):(f=new AWS.CognitoSyncManager.DatasetMetadata({DatasetName:b,CreationDate:g,LastModifiedDate:g}),d.setDatasetMetadata(a,b,f,function(a,b){}),c(null,b))}),this},a.prototype.getDatasetMetadata=function(a,b,c){var d=this.getMetadataKey(a,b);return null!==this.meta?this.meta[d]?c(null,new AWS.CognitoSyncManager.DatasetMetadata(this.meta[d])):c(null,void 0):this.loadMetadataCache(a,function(a,b){b[d]?c(null,new AWS.CognitoSyncManager.DatasetMetadata(b[d])):c(null,void 0)}),this},a.prototype.setDatasetMetadata=function(a,b,c,d){return this.meta[this.getMetadataKey(a,b)]=c.toJSON(),this.saveMetadataCache(a,this.meta,d),this},a.prototype.getValue=function(a,b,c,d){this.getRecord(a,b,c,function(a,b){return b?d(null,b.getValue()):d(null,void 0)})},a.prototype.putValue=function(a,b,c,d,e){var f=this;this.getRecord(a,b,c,function(g,h){return h&&h.getValue()===d?e(null,h):(h||(h=new AWS.CognitoSyncManager.Record),h.setKey(c).setValue(d).setModified(!0).setSyncCount(h?h.getSyncCount():0).setDeviceLastModifiedDate(new Date),void f.store.set(a,b,c,h.toJSON(),function(c){return c?e(c):void f.updateLastModifiedTimestamp(a,b,function(a){return e(a,h)})}))})},a.prototype.getValueMap=function(a,b,c){var d,e={};this.getRecords(a,b,function(a,b){for(var f in b)b.hasOwnProperty(f)&&(d=b[f],d.isDeleted()||(e[d.getKey()]=d.getValue()));c(null,e)})},a.prototype.putAllValues=function(a,b,c,d){var e=this,f=[];for(var g in c)c.hasOwnProperty(g)&&f.push(g);var h=function(g){var i;return g?d(g):void(f.length>0?(i=f.shift(),e.putValue(a,b,i,c[i],h)):d(null,!0))};h(null,null)},a.prototype.getDatasets=function(a,b){var c=[];if(null!==this.meta){for(var d in this.meta)this.meta.hasOwnProperty(d)&&c.push(new AWS.CognitoSyncManager.DatasetMetadata(this.meta[d]));return b(null,c)}this.loadMetadataCache(a,function(a,d){for(var e in d)d.hasOwnProperty(e)&&c.push(new AWS.CognitoSyncManager.DatasetMetadata(d[e]));return b(null,c)})},a.prototype.updateDatasetMetadata=function(a,b,c){var d=this;this.getDatasetMetadata(a,b.getDatasetName(),function(e,f){e&&c(e),f||(f=new AWS.CognitoSyncManager.DatasetMetadata),f.setDatasetName(b.getDatasetName()).setCreationDate(b.getCreationDate()).setLastModifiedDate(b.getLastModifiedDate()).setLastModifiedBy(b.getLastModifiedBy()).setLastSyncCount(b.getLastSyncCount()).setRecordCount(b.getRecordCount()).setDataStorage(b.getDataStorage()),d.meta[d.getMetadataKey(a,b.getDatasetName())]=f.toJSON(),d.saveMetadataCache(a,d.meta,function(a){return a?c(a):c(null,f)})})},a.prototype.getRecord=function(a,b,c,d){this.store.get(a,b,c,function(a,b){return b?d(null,new AWS.CognitoSyncManager.Record(b)):d(new Error("Key doesn't exist."),null)})},a.prototype.getRecords=function(a,b,c){var d=[];this.store.getAll(a,b,function(a,b){for(var e in b)b.hasOwnProperty(e)&&d.push(new AWS.CognitoSyncManager.Record(b[e]));c(null,d)})},a.prototype.putRecords=function(a,b,c,d){var e=this;c=c||[],c=c.slice();var f=function(){c.length>0&&e.updateAndClearRecord(a,b,c.shift(),function(a){return a?d(a):0===c.length?d(null,!0):void f()})};f()},a.prototype.deleteDataset=function(a,b,c){var d=this;this.store.removeAll(a,b,function(e){return e?c(e):void d.getDatasetMetadata(a,b,function(b,e){return b?c(b):(e.setLastModifiedDate(new Date),e.setLastSyncCount(-1),void d.updateDatasetMetadata(a,e,function(a){return a?c(a):c(null,!0)}))})})},a.prototype.purgeDataset=function(a,b,c){var d=this;this.deleteDataset(a,b,function(e){e&&c(e),delete d.meta[d.getMetadataKey(a,b)],d.saveMetadataCache(a,d.meta,c)})},a.prototype.getLastSyncCount=function(a,b,c){this.getDatasetMetadata(a,b,function(a,b){return b?c(null,b.getLastSyncCount()):void c(new Error("Dataset doesn't exist."),null)})},a.prototype.getModifiedRecords=function(a,b,c){var d=[];this.getRecords(a,b,function(a,b){for(var e=0;e<b.length;e++)b[e].isModified()&&d.push(b[e]);c(null,d)})},a.prototype.updateLastSyncCount=function(a,b,c,d){var e=this;this.getDatasetMetadata(a,b,function(b,f){b&&d(b),f.setLastSyncCount(c).setLastSyncDate(new Date),e.updateDatasetMetadata(a,f,function(a){a&&d(a),d(null,!0)})})},a.prototype.wipeData=function(a){this.store.wipe(a)},a.prototype.updateLastModifiedTimestamp=function(a,b,c){var d=this;this.getDatasetMetadata(a,b,function(b,e){return b?c(b):(e.setLastModifiedDate(new Date),void d.updateDatasetMetadata(a,e,function(a){return a?c(a):c(null,!0)}))})},a.prototype.removeRecord=function(a,b,c,d){this.store.remove(a,b,c,function(a){return a?d(a):d(null,!0)})},a.prototype.updateAndClearRecord=function(a,b,c,d){this.store.set(a,b,c.getKey(),c.toJSON(),function(a){return a?d(a):d(null,!0)})},a}(),AWS=AWS||{},AWS.CognitoSyncManager=AWS.CognitoSyncManager||{},AWS.CognitoSyncManager.Record=function(){var a=function(a){a=a||{},this.key=a.Key||"",this.value=a.Value||"",this.syncCount=a.SyncCount||0,this.lastModifiedDate=a.LastModifiedDate?new Date(a.LastModifiedDate):new Date,this.lastModifiedBy=a.LastModifiedBy||"",this.deviceLastModifiedDate=a.DeviceLastModifiedDate?new Date(a.DeviceLastModifiedDate):new Date,this.modified=a.Modified||!1};return a.prototype.getKey=function(){return this.key},a.prototype.setKey=function(a){return this.key=a,this},a.prototype.getValue=function(){return this.value},a.prototype.setValue=function(a){return this.value=a,this},a.prototype.getSyncCount=function(){return this.syncCount},a.prototype.setSyncCount=function(a){return this.syncCount=a,this},a.prototype.getLastModifiedDate=function(){return new Date(this.lastModifiedDate)},a.prototype.setLastModifiedDate=function(a){return this.lastModifiedDate=new Date(a),this},a.prototype.getLastModifiedBy=function(){return this.lastModifiedBy},a.prototype.setLastModifiedBy=function(a){return this.lastModifiedBy=a,this},a.prototype.getDeviceLastModifiedDate=function(){return new Date(this.deviceLastModifiedDate)},a.prototype.setDeviceLastModifiedDate=function(a){return this.deviceLastModifiedDate=new Date(a),this},a.prototype.isModified=function(){return this.modified},a.prototype.setModified=function(a){return this.modified=a,this},a.prototype.isDeleted=function(){return null===this.value},a.prototype.toString=function(){return JSON.stringify(this)},a.prototype.toJSON=function(){return{Key:this.key,Value:this.value,SyncCount:this.syncCount,LastModifiedDate:this.lastModifiedDate,LastModifiedBy:this.lastModifiedBy,DeviceLastModifiedDate:this.deviceLastModifiedDate,Modified:this.modified}},a}(),AWS=AWS||{},AWS.CognitoSyncManager=AWS.CognitoSyncManager||{},AWS.CognitoSyncManager.RemoteStorage=function(){var a=function(a,b){this.identityPoolId=a,this.provider=b,this.client=new AWS.CognitoSync};return a.prototype.userAgent="",a.prototype.getIdentityId=function(){return this.provider.identityId},a.prototype.getDatasets=function(a){var b=this,c=[],d=null,e=function(a,c){b.client.listDatasets({IdentityId:b.getIdentityId(),IdentityPoolId:b.identityPoolId,MaxResults:64,NextToken:a},c)},f=function(b,g){for(var h=g.Datasets||[],i=0;i<h.length;i++)c.push(new AWS.CognitoSyncManager.DatasetMetadata(h[i]));d=g.NextToken,d?e(d,f):a(null,c)};e(d,f)},a.prototype.listUpdates=function(a,b,c){var d=this,e=null,f=new AWS.CognitoSyncManager.DatasetUpdates(a),g=function(c,e){d.client.listRecords({DatasetName:a,IdentityId:d.getIdentityId(),IdentityPoolId:d.identityPoolId,LastSyncCount:b,MaxResults:1024,NextToken:c},e)},h=function(a,b){if(a)return c(a);b=b||{};for(var d,i=b.Records||[],j=0;j<i.length;j++)d=new AWS.CognitoSyncManager.Record(i[j]),d.setModified(!1),f.addRecord(d);f.setSyncSessionToken(b.SyncSessionToken).setSyncCount(b.DatasetSyncCount).setExists(b.DatasetExists).setDeleted(b.DatasetDeletedAfterRequestedSyncCount),b.MergedDatasetNames&&f.setMergedDatasetNameList(b.MergedDatasetNames),e=b.NextToken,e?g(e,h):c(null,f)};g(null,h)},a.prototype.putRecords=function(a,b,c,d){var e,f=this,g=[];for(var h in b)b.hasOwnProperty(h)&&(e=b[h],g.push({Key:e.getKey(),Op:e.getValue()?"replace":"remove",SyncCount:e.getSyncCount(),DeviceLastModifiedDate:e.getDeviceLastModifiedDate(),Value:e.getValue()}));this.client.updateRecords({DatasetName:a,IdentityId:f.getIdentityId(),IdentityPoolId:f.identityPoolId,SyncSessionToken:c,RecordPatches:g},function(b,c){var e="string"==typeof a?a:"(invalid dataset name)";if(b)return d(new Error("Failed to update records in dataset: "+e+" ("+b.message+")"),null);for(var f,g=[],h=0;h<c.Records.length;h++)f=new AWS.CognitoSyncManager.Record(c.Records[h]),f.setModified(!1),g.push(f);return d(null,g)})},a.prototype.deleteDataset=function(a,b){this.client.deleteDataset({DatasetName:a,IdentityId:this.getIdentityId(),IdentityPoolId:this.identityPoolId},function(a,c){return a?b(new Error("Failed to delete dataset."),null):b(null,c)})},a.prototype.getDatasetMetadata=function(a,b){this.client.describeDataset({DatasetName:a,IdentityId:this.getIdentityId(),IdentityPoolId:this.identityPoolId},function(a,c){return a?b(new Error("Failed to get dataset metadata."),null):b(null,new AWS.CognitoSyncManager.DatasetMetadata(c.Dataset))})},a.prototype.setUserAgent=function(a){this.userAgent=a},a}(),AWS=AWS||{},AWS.CognitoSyncManager=AWS.CognitoSyncManager||{},AWS.CognitoSyncManager.StoreInMemory=function(){var a=function(){this.store={}};return a.prototype.makeKey=function(a,b){return a+"."+b},a.prototype.get=function(a,b,c,d){var e=this.makeKey(a,b);return a&&b?this.store[e]&&this.store[e][c]?d(null,this.store[e][c]):d(null,void 0):d(new Error("You must provide an identity id and dataset name."),null)},a.prototype.getAll=function(a,b,c){var d=this.makeKey(a,b);return a&&b?c(null,this.store[d]):c(new Error("You must provide an identity id and dataset name."),null)},a.prototype.set=function(a,b,c,d,e){var f=this.makeKey(a,b),g=this.store[f]||{};return g[c]=d,this.store[f]=g,e(null,g)},a.prototype.setAll=function(a,b,c,d){var e=this.makeKey(a,b);return this.store[e]=c,d(null,c)},a.prototype.remove=function(a,b,c,d){var e=this.makeKey(a,b),f=JSON.parse(this.store[e]);return f||(f={}),delete f[c],this.store[e]=JSON.stringify(f),d(null,!0)},a.prototype.removeAll=function(a,b,c){var d=this.makeKey(a,b);return delete this.store[d],c(null,!0)},a.prototype.wipe=function(a){return this.store={},a(null,!0)},a}(),AWS=AWS||{},AWS.CognitoSyncManager=AWS.CognitoSyncManager||{},AWS.CognitoSyncManager.StoreLocalStorage=function(){var a=function(){this.store=window.localStorage};return a.prototype.makeKey=function(a,b){return a+"."+b},a.prototype.get=function(a,b,c,d){var e=this.makeKey(a,b);if(!a||!b)return d(new Error("You must provide an identity id and dataset name."),null);var f=JSON.parse(this.store.getItem(e));return f&&f[c]?d(null,f[c]):d(null,void 0)},a.prototype.getAll=function(a,b,c){var d=this.makeKey(a,b);return a&&b?c(null,JSON.parse(this.store.getItem(d))):c(new Error("You must provide an identity id and dataset name."),null)},a.prototype.set=function(a,b,c,d,e){var f=this.makeKey(a,b),g=JSON.parse(this.store.getItem(f));return g||(g={}),g[c]=d,this.store.setItem(f,JSON.stringify(g)),e(null,g),this},a.prototype.setAll=function(a,b,c,d){var e=this.makeKey(a,b);return this.store.setItem(e,JSON.stringify(c)),d(null,c)},a.prototype.remove=function(a,b,c,d){var e=this.makeKey(a,b),f=JSON.parse(this.store.getItem(e));return f||(f={}),delete f[c],this.store.setItem(e,JSON.stringify(f)),d(null,!0)},a.prototype.removeAll=function(a,b,c){var d=this.makeKey(a,b);return this.store.removeItem(d),c(null,!0)},a.prototype.wipe=function(a){for(var b in this.store)this.store.hasOwnProperty(b)&&b.indexOf("aws.cognito.identity")===-1&&this.store.removeItem(b);return a?a(null,!0):this},a}();
//# sourceMappingURL=amazon-cognito.min.js.map

}));

/*
     FILE ARCHIVED ON 12:20:59 Mar 24, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:41:11 Dec 07, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 129.645
  LoadShardBlock: 109.796 (3)
  esindex: 0.01
  PetaboxLoader3.resolve: 188.039
  CDXLines.iter: 14.974 (3)
  exclusion.robots: 0.274
  load_resource: 254.045
  RedisCDXSource: 0.744
  exclusion.robots.policy: 0.248
  PetaboxLoader3.datanode: 97.206 (4)
*/