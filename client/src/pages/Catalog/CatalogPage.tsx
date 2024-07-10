import React, { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import OneCard from "../../components/OneCard/OneCard";
import { Button, Heading, Wrap } from "@chakra-ui/react";
import { getProducts } from "../../redux/thunkActionsCatalog";
import { AuthState, ProductState } from "../../redux/types/states";
import { IProducts } from "../../types/stateTypes";
import { Stack, HStack, VStack, Box, SimpleGrid } from "@chakra-ui/react";
// import { useNavigate } from 'react-router-dom';я

export default memo(function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector(
    (state: { productSlice: ProductState }) => state.productSlice
  );
  const { user } = useAppSelector(
    (state: { authSlice: AuthState }) => state.authSlice
  );

  useEffect((): void => {
    dispatch(getProducts());
  }, []);

  // console.log('products-------------++', products);

  return (
    <>
      {user?.isAdmin ? (
        <Button variant="solid" colorScheme="green">
          Добавить новые продукты в каталог
        </Button>
       ) : (
        false
      )} 

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
