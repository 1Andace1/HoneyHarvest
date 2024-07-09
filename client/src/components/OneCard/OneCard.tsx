import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Text, Image } from "@chakra-ui/react";


export default function OneCard(): JSX.Element {






  return (
    <div>
<Card maxW='sm'>
  <CardBody>
    <Image
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='honey'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Living room Sofa</Heading>
      <Text>
        Здесь располагается текст
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        $450
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Купить
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Добавить в корзину
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
     
    </div>
  );
}

