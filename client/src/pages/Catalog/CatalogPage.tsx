import React, { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import OneCard from "../../components/OneCard/OneCard";
import { Heading } from "@chakra-ui/react";
import { getProducts } from "../../redux/thunkActionsCatalog";
import { ProductState } from "../../redux/types/states";
import { IProducts } from "../../types/stateTypes";
import { Stack, HStack, VStack, Box } from "@chakra-ui/react";
import FilterComponent from "./Filter";

export default memo(function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector(
    (state: { productSlice: ProductState }) => state.productSlice
  );

  const [filteredProducts, setFilteredProducts] = useState<IProducts[]>([]);

  useEffect((): void => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  const handleFilterChange = (filter: { category: string; sort: string; location: string; starsRating: number; maxPrice: number }) => {
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
  console.log(products)

  return (
    <>
      <FilterComponent onFilterChange={handleFilterChange} />
      {filteredProducts.length ? (
        filteredProducts.map((el: IProducts) => (
          <Stack direction="row" spacing="24px" key={el.id}>
            <OneCard el={el} />
          </Stack>
        ))
      ) : (
        <Heading as="h2" size="2xl">
          Каталог пуст
        </Heading>
      )}
    </>
  );
});