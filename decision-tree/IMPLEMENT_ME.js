/* Class definitions */

/* A datapoint has features and a label.
  featureMap is a hash of features to values
  label is either Label.FRAUD or Label.NOT_FRAUD
*/
function Datapoint(featureMap, label) {
  this.featureMap = featureMap;
  this.label = label;
}

/* Label "enum". The freeze prevents these values from being changed.
  You should be able to refer simply to Label.FRAUD and Label.NOT_FRAUD.
 */
var Label = Object.freeze({
  FRAUD: "FRAUD",
  NOT_FRAUD: "NOT_FRAUD"
});

/* Features "enum". The freeze prevents these values from being changed. */
var Features = Object.freeze({
  NUM_CHARGEBACKS: "NUM_CHARGEBACKS",
  AGE_OF_ACCOUNT_IN_DAYS: "AGE_OF_ACCOUNT_IN_DAYS",
  DECLINE_RATE: "DECLINE_RATE",
  CARD_DIVERSITY: "CARD_DIVERSITY"
});

/* IMPLEMENT THE FUNCTIONS BELOW
--------------------------------
*/

/*
  The Gini impurity of a set is defined as 1 - sum(freq_i^2), where freq_i are the frequencies for each class.
  In our case, we have two classes, the fraud and non-fraud classes.
  The frequency of a given class is the num of times it occurs in the dataset, divided by the total size of the dataset.
  For example, if there are 4 fraud datapoints and 6 non-fraud datapoints, the frequency of fraud is 0.4 and the frequency of non-fraud is 0.6.
  The Gini impurity in this case would be 1 - 0.4 * 0.4 - 0.6 * 0.6 = 0.48
*/
function calculateGiniImpurityOfSet(datapoints) {
  
  if (datapoints.length === 0) return 0;

  var fraudFrequency = 0;
  var notFraudFrequency = 0;

  for (var i = 0; i < datapoints.length; i++) {
    if (datapoints[i].label === Label.FRAUD) {
      fraudFrequency++;
    } else {
      notFraudFrequency++;
    }
  };

  fraudFrequency /= datapoints.length;
  notFraudFrequency /=datapoints.length;

  return 1 - fraudFrequency * fraudFrequency - notFraudFrequency * notFraudFrequency;
}

/*
  The Gini impurity of a split is the average of the Gini impurities of each subset,
  weighted by the size of each subset.
*/
function calculateGiniImpurityOfSplit(datapoints1, datapoints2) {
  var length1 = datapoints1.length;
  var length2 = datapoints2.length;
  var totalSize = length1 + length2;
  var gini1 = calculateGiniImpurityOfSet(datapoints1);
  var gini2 = calculateGiniImpurityOfSet(datapoints2);
  return length1 / totalSize * gini1 + length2 / totalSize * gini2; 
}


