
/**
 * Defines a geographical region with child regions.
 *
 * @export
 * @class Regions
 */
export class Regions {

  /**
   *The Id of the region.
   *
   * @type {string}
   * @memberof Regions
   */
  id: string;

  /**
   * The title of the region.
   *
   * @type {string}
   * @memberof Regions
   */
  title: string;

  /**
   * The array of subregions/child regions.
   *
   * @type {string[]}
   * @memberof Regions
   */
  regions: string[];
}
