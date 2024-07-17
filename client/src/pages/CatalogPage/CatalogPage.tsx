import { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import OneCard from "../../components/OneCard/OneCard";
import {  Heading, Wrap } from "@chakra-ui/react";
import { getProducts } from "../../redux/thunkActionsCatalog";
import { AuthState, ProductState } from "../../redux/types/states";
import { IProduct } from "../../types/stateTypes";
import FilterComponent from "./Filter";
import ModalFormCreate from "../../components/ModalForm/ModalFormCreate";
// import styles from "./Catalog.css";


export default memo(function CatalogPage(): JSX.Element {

  const dispatch = useAppDispatch();

  const { products } = useAppSelector(
    (state: { productSlice: ProductState }) => state.productSlice
  );
  const { user } = useAppSelector(
    (state: { authSlice: AuthState }) => state.authSlice
  );
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const[openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };
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
    const filtered = products.filter((product: IProduct) => {
      return (
        (category ? product.category === category : true) &&
        (sort ? product.sort === sort : true) &&
        (location ? product.location === location : true) &&
        (starsRating ? product.starsRating >= starsRating : true) &&
        (maxPrice ? product.price <= maxPrice : true)
      );
    });
    // console.log("-------------:", filtered);
    setFilteredProducts(filtered);
  };


  return (
    <>
      {user?.isAdmin ? (
                <ModalFormCreate />
      ) : (
        false
      )}
      <button className='btnFilter' onClick={handleOpenFilter}  >
  <div>-</div>
  <div>-</div>
  <div>-</div>
</button>
      {openFilter ? (
      <FilterComponent onFilterChange={handleFilterChange} />
    ) : <></>}
      <Wrap spacing="30px">
        {filteredProducts.length ? (
          filteredProducts.map((el: IProduct) => (
            <OneCard el={el} key={el.id} />
          ))
        ) : (
          <>
          <Heading as="h2" size="2xl">
            Каталог пуст или загружается
          </Heading>
          {/* <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        /> */}
        </>
        )}
      </Wrap>
    </>
  );
});
