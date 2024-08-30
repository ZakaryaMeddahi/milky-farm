import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';

const StatCard = ({ label, value, helpText }) => (
  <Stat
    px={{ base: 2, md: 4 }}
    py={'5'}
    shadow={'xl'}
    border={'2px solid'}
    borderColor={'blue.400'}
    rounded={'lg'}
  >
    <StatLabel fontWeight={'medium'} isTruncated>
      {label}
    </StatLabel>
    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
      {value}
    </StatNumber>
    <StatHelpText>{helpText}</StatHelpText>
  </Stat>
);

export default StatCard;
