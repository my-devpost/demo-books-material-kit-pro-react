import MKBox from "components/MKBox";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

import routes from "routes-book";
import footerRoutes from "footer.routes";

import BookAdd from "../components/book-add.component";

function Book() {
  return (
    <>
      <MKBox variant="gradient" bgColor="dark" shadow="sm" py={0.25}>
        <DefaultNavbar
          brand="Material Kit 2"
          path="/"
          routes={routes}
          transparent
          relative
          light
          right
        />
      </MKBox>
      <BookAdd />

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Book;
