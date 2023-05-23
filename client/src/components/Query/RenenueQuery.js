import { gql } from '@apollo/client';

const GET_REVENUE_REPORT = gql`
  query GetRevenueReport {
    revenue_report {
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