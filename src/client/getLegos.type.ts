export type legoTypeApi = {
  set_num: string;
  name: string;
  num_parts: number;
  set_img_url: string;
  set_url: string;
  last_modified_dt: string;
};

export type legoPartApi = Partial<{
  color: {
    id: number;
    name: string;
    rgb: string;
    is_trans: boolean;
    external_ids: any;
  };
  element_id: string;
  id: number;
  inv_part_id: number;
  is_spare: boolean;
  num_sets: number;
  part: {
    external_ids: {
      BrickLink: Array<any>;
      BrickOwl: Array<any>;
      Brickset: Array<any>;
      LDraw: Array<any>;
      LEGO: Array<any>;
    };
    name: string;
    part_cat_id: number;
    part_img_url: string;
    part_num: string;
    part_url: string;
    print_of: any;
  };
  quantity: number;
  set_num: string;
}>;
export type legoPartsApi = Partial<Array<legoPartApi>>