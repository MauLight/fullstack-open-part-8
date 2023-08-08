import { gql } from '@apollo/client'

export const ALL_PEOPLE = gql`
query {
    allPeople {
        name
        phone
        id
    }
}
`

export const CREATE_PERSON = gql`
mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String!) {
    addPerson(
        name: $name
        street: $street
        city: $city
        phone: $phone
    ) {
        name
        phone
        id
        address {
            street
            city
        }
    }
}
`

export const FIND_PERSON = gql`
query findPersonByName($nameToSearch: String!) {
  findPerson(name: $nameToSearch) {
    name
    phone
    address {
      street
      city
    }
  }
}
`

export const EDIT_PHONE = gql`
mutation editNumber($name: String!, $phone: String!) {
  editNumber(name: $name, phone: $phone) {
    name
    phone
    address {
      street
      city
    }
    id
  }
}
`