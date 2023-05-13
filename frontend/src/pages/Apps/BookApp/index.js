/*
=========================================================
* Material Kit 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// Tables page components
// import TableOne from "layouts/sections/elements/tables/components/TableOne";
import TableBook from "pages/Apps/BookApp/components/TableBook";

// Tables page components code
// import tableOneCode from "layouts/sections/elements/tables/components/TableOne/code";
import tableBookCode from "pages/Apps/BookApp/components/TableBook/code";

function BookApp() {
  return (
    <BaseLayout
      title="Book App"
      breadcrumb={[
        { label: "Page Sections", route: "/pages/apps/book-app" },
        { label: "Book App" },
      ]}
    >
      <View title="Table Book" code={tableBookCode}>
        <TableBook />
      </View>
      {/* <View title="Table One" code={tableOneCode}>
        <TableOne />
      </View> */}
    </BaseLayout>
  );
}

export default BookApp;
