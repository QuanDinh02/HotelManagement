import { gql } from '@apollo/client';

const GET_REVENUE_REPORT = gql`
  query GetRevenueReport($month: Int!, $year: Int!) {
    revenue_report(month: $month, year: $year) {
        room_categories {
            id
            name
        }

        revenue_results {
            id
            name
            revenue_total
            rate
        }
    }
  }
`;

export {
    GET_REVENUE_REPORT
}