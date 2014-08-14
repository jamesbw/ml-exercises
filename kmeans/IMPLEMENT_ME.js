/* Class definitions */

/* A Point has a position defined by x, y and a centroid that it can be assigned to.
  When no centroid is assigned, the following is true: this.centroid === undefined
  Points are created when data is loaded. You shouldn't need to call new Point(...).
*/
function Point(x, y, centroid) {
  this.x = x;
  this.y = y;
  this.centroid = centroid;
}

/* A Centroid has a position defined by x,y.
  Centroids are created and removed by clicking on the Add Centroid and Remove Centroid buttons.
  You shouldn't need to call new Centroid(...).
  The id field is needed so that the same color is always used when displaying the centroid. Ignore this field.
*/ 
function Centroid(x, y, id) {
  this.x = x;
  this.y = y;
  this.id = id;
}

/* App variables */

//centroids is a list of the current centroids. It starts empty until you click on add centroid.
var centroids = [];

//points is a list of currently displayed points.
var points = [];


/* IMPLEMENT THE FUNCTIONS BELOW
--------------------------------
*/

/* For each point, assign it to the cluster represented by the closest centroid */
function assignCentroids() {
  for (var i = points.length - 1; i >= 0; i--) {
    var point = points[i];
    point.centroid = closestCentroid(point);
  };
}

/* Update the position of each centroid based on the points assigned to it. 
  The new position should be the mean of the positions of the points assigned to it.
*/
function updateCentroids() {
  for (var i = centroids.length - 1; i >= 0; i--) {
    var centroid = centroids[i];
    var sumX = 0;
    var sumY = 0;
    var count = 0;
    for (var j = 0; j < points.length; j++) {
      point = points[j];
      if (point.centroid === centroid) {   
        var point = points[j];
        sumX += point.x;
        sumY += point.y;
        count ++;
      };
    };
    if (count > 0) {
      centroid.x = sumX / count;
      centroid.y = sumY / count;
    };
  };
}

var closestCentroid = function(point) {
  var minDist = Infinity;
  var closestCentroid;
  for (var i = centroids.length - 1; i >= 0; i--) {
    var centroid = centroids[i];
    var dist = squaredDistance(point, centroid);
    if (dist < minDist) {
      minDist = dist;
      closestCentroid = centroid;
    }
  };
  return closestCentroid;
}
