import React, { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import OneCard from "../../components/OneCard/OneCard";
import { Heading, Wrap } from "@chakra-ui/react";
import { getProducts } from "../../redux/thunkActionsCatalog";
import { ProductState } from "../../redux/types/states";
import { IProducts } from "../../types/stateTypes";
import { Stack, HStack, VStack, Box, SimpleGrid } from "@chakra-ui/react";
import { Stack, HStack, VStack, Box } from "@chakra-ui/react";
// import { useNavigate } from 'react-router-dom';

export default memo(function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector(
    (state: { productSlice: ProductState }) => state.productSlice
  );
  const { products } = useAppSelector(
    (state: { productSlice: ProductState }) => state.productSlice
  );

  useEffect((): void => {
    dispatch(getProducts());
  }, []);

  // console.log('products-------------++', products);
  // console.log('products-------------++', products);

  return (
    <>
      {/* <SimpleGrid columns={[2, null, 3]} spacing={4} > */}
      {/* <Stack direction="row" spacing="24px"> */}
      <Wrap spacing="30px">
        {products.length ? (
          products.map((el: IProducts) => <OneCard el={el} key={el.id} />)
        ) : (
          <Heading as="h2" size="2xl">
            Каталог пуст
          </Heading>
        )}
      </Wrap>
      {/* </Stack> */}
      {/* </SimpleGrid> */}
    </>
  );
});
