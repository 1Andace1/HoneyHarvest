import { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import OneCard from "../../components/OneCard/OneCard";
import {  Heading,  Wrap } from "@chakra-ui/react";
import { getProducts } from "../../redux/thunkActionsCatalog";
import { AuthState, ProductState } from "../../redux/types/states";
import { IProducts } from "../../types/stateTypes";
import FilterComponent from "./Filter";
import ModalFormCreate from "../../components/ModalForm/ModalFormCreate";

export default memo(function CatalogPage(): JSX.Element {

  const dispatch = useAppDispatch();

  const { products } = useAppSelector(
    (state: { productSlice: ProductState }) => state.productSlice
  );
  const { user } = useAppSelector(
    (state: { authSlice: AuthState }) => state.authSlice
  );
  const [filteredProducts, setFilteredProducts] = useState<IProducts[]>([]);

  useEffect((): void => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  const handleFilterChange = (filter: {
    category: string;
    sort: string;
    location: string;
    starsRating: number;
    maxPrice: number;
  }) => {
    console.log("++++++++++:", filter);
    const { category, sort, location, starsRating, maxPrice } = filter;
    const filtered = products.filter((product) => {
      return (
        (category ? product.category === category : true) &&
        (sort ? product.sort === sort : true) &&
        (location ? product.location === location : true) &&
        (starsRating ? product.starsRating >= starsRating : true) &&
        (maxPrice ? product.price <= maxPrice : true)
      );
    });
    console.log("-------------:", filtered);
    setFilteredProducts(filtered);
  };
  // console.log(products);

  return (
    <>
      {user?.isAdmin ? (
                <ModalFormCreate id={user.id} />
      ) : (
        false
      )}

      {/* <SimpleGrid columns={[2, null, 3]} spacing={4} > */}
      {/* <Stack direction="row" spacing="24px"> */}
      <FilterComponent onFilterChange={handleFilterChange} />
      <Wrap spacing="30px">
        {filteredProducts.length ? (
          filteredProducts.map((el: IProducts) => (
            // <Stack direction="row" spacing="24px" key={el.id}>
            <OneCard el={el} key={el.id} />
            // </Stack>
          ))
        ) : (
          <Heading as="h2" size="2xl">
            Каталог пуст или загружается
          </Heading>
        )}
      </Wrap>

      {/* </Stack> */}
      {/* </SimpleGrid> */}
    </>
  );
});
