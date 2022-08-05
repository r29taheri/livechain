import { Link, ListItem } from '@chakra-ui/react';

interface Props {
  to: string;
  caption: string;
  onClick?: () => void;
}

export const NavLink = ({ to, onClick, caption }: Props) => {
  return (
    <ListItem
      pos="relative"
      title={caption}
      cursor="pointer"
      transition="300ms"
      my={{ base: 4, lg: 0 }}
      px={{ base: 0, lg: '50px' }}
      _hover={{ color: '#FFF' }}
      fontWeight={450}
      color="#EEEFFD"
    >
      <Link href={to} onClick={onClick}>
        {caption}
      </Link>
    </ListItem>
  );
};
