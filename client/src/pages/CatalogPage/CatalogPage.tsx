import { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import OneCard from '../../components/OneCard/OneCard';
import { Button, Heading, Wrap } from '@chakra-ui/react';
import { getProducts } from '../../redux/thunkActionsCatalog';
import { AuthState, ProductState } from '../../redux/types/states';
import { IProduct } from '../../types/stateTypes';
import FilterComponent from './Filter';
import ModalFormCreate from '../../components/ModalForm/ModalFormCreate';
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
  const [openFilter, setOpenFilter] = useState(false);

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
    console.log('++++++++++:', filter);
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
      {user?.isAdmin ? <ModalFormCreate /> : false}
      <Button
  className="btnFilter"
  variant="solid"
  display="flex"
  justifyContent="center" 
  position="fixed"
  left="10px" 
  top="75px" 
  onClick={handleOpenFilter}
  style={{
    color: "white", 
    backgroundImage: "linear-gradient(to right,#CBD5E0, #EDF2F7)", 
    borderColor: "#CBD5E0", 
    borderWidth: "1.5px", 
    borderStyle: "solid", 
    borderRadius: "8px", 
    height: "40px", 
    width: "120px", 
    zIndex: 10, 
    textAlign: "center", 
  }}
  _hover={{
    borderColor: "#CBD5E0"
  }}
  _active={{
    borderColor: "#CBD5E0" 
  }}
>
<h2 style={{ margin: 0 }}>фильтр</h2>
      </Button>
      {openFilter ? (
        <FilterComponent onFilterChange={handleFilterChange} />
      ) : (
        <></>
      )}
      <Wrap justify="center" spacing="30px">
        {filteredProducts.length ? (
          filteredProducts.map((el: IProduct) => (
               //  @ts-ignore
            <OneCard type="catalog" el={el} key={el.id} basketId="0" />
          ))
        ) : (
          <>
            <Heading as="h2" size="2xl">
              Каталог загружается
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
