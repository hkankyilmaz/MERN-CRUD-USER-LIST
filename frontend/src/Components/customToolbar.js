import React from "react";

import {
  GridToolbarQuickFilter,
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid-premium";

function customToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport csvOptions={{ fileName: "MalwaLogExport_" }} />
      <GridToolbarDensitySelector />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

export default customToolbar;
