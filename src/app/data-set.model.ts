export interface DataSet {
  /**
   * Short-hand ID for referencing the series in the system
   *
   * @type {string}
   * @memberof DataSet
   */
  concept: string;

  /**
   * Human readable version of the concept
   *
   * @type {string}
   * @memberof DataSet
   */
  description: string;

  /**
   * The 3rd or 1st party that provided the data
   *
   * @type {string}
   * @memberof DataSet
   */
  source: string;

  /**
   * Frequency code
   *
   * @type {number}
   * @memberof DataSet
   */
  freq: number;

  /**
   * What type of numerical transformation was performed (i.e. % change, simple diff, etc..)
   *
   * @type {string}
   * @memberof DataSet
   */
  transformation: string;

  /**
   * @nodesc
   *
   * @type {DataPoints[]}
   * @memberof DataSet
   */
  data: DataPoints[];
}

export interface DataPoints {
  /**
   * Integer based date (frequency dependent)
   *
   * @type {number}
   * @memberof DataPoints
   */
  period: number;

  /**
   * Human readable version of the period
   *
   * @type {string}
   * @memberof DataPoints
   */
  date: string;

  /**
   * Collection of data points for the period
   *
   * @type {DataPoint[]}
   * @memberof DataPoints
   */
  mapData: DataPoint[];
}

export interface DataPoint {
  /**
   * The geographies data
   *
   * @type {number}
   * @memberof DataPoint
   */
  value: number;

  /**
   * The geography code
   *
   * @type {string}
   * @memberof DataPoint
   */
  code: string;
}
