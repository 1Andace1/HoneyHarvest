import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Image,
  HStack,
  VStack,
  Box,
} from "@chakra-ui/react";
import { IProducts } from "../../types/stateTypes";

export default function OneCard({ el }: { el: IProducts }): JSX.Element {
  const title = el.title;
  const price = el.price / 10;
  const discountRatio = el.discountRatio;
  const category = el.category;
  const sort = el.sort;
  const description = el.description;
  const yearOfHarvest = el.yearOfHarvest;
  const availableQuantity = el.availableQuantity;
  const picture = el.picture;
  const location = el.location;
  const starsRating = el.starsRating;
  const priceConDiscountRatio = price * discountRatio;

  return (
    <div>
        <Card maxW="sm">
          <CardBody>
            <Image
              src={picture}
              // src="/productsPhoto/105.jpeg"
              alt="honey"
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{title}</Heading>
              <Text>{description}</Text>
              <Text>Год урожая: {yearOfHarvest}</Text>
              <Text>Сорт: {sort}</Text>
              <Text>Местонахождение: {location}</Text>
              <Text color="blue.600" fontSize="2xl">
                {price} руб. / 100 гр.
              </Text>
              <Text color="blue.600" fontSize="2xl">
                Цена со скидкой: {priceConDiscountRatio} руб. / 100 гр.
              </Text>
              <Text>Рейтинг: {starsRating}</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button variant="solid" colorScheme="blue">
                Купить
              </Button>
              <Button variant="ghost" colorScheme="blue">
                Добавить в корзину
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
    </div>
  );
}
