import React from "react";
import {SortIcon} from './SortIcon'
import {FilterIcon} from './FilterIcon'

const Buttons = () => {
  return (
    <div>
        <button>
            <SortIcon/>
            Sort By:
        </button>
        <button>
            <FilterIcon/>
            Filter By:
        </button>
    </div>
  );
};

export { Buttons };
