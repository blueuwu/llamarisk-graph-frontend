import { gql } from '@apollo/client';

export const GET_CRYPTO_PRICES = gql`
  query GetCryptoPrices {
    allCryptocurrencies {
      name
      symbol
      price
      price1hAgo
      price24hAgo
      dailyHigh
      dailyLow
      lastUpdated
    }
  }
`;