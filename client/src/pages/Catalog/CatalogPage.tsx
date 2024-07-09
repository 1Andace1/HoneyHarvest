import React, { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import OneCard from "../../components/OneCard/OneCard";
import { Heading } from "@chakra-ui/react";
import { getProducts } from "../../redux/thunkActionsCatalog";
// import { useNavigate } from 'react-router-dom';

export default memo(function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.productSlice);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
  <>
{ products.lenght ? products.map((el) => 
<OneCard />
)
:
<Heading as='h2' size='2xl'>
Каталог пуст
</Heading>
}  
</>
  )
});
