import { ApolloServer, gql } from 'apollo-server'

const Questions = [
  {
    subject: "chemistry",
    examtype: "utme",
    examyear: "2005",
    question: "Natural water collected from rivers and ponds contains oxygen, carbon(IV) oxide and",
    option: {
      a: "Chlorine",
      b: "Hydrogen",
      c: "Sulphur(IV) oxide",
      d: "Nitrogen"
      },
    answer: "c"
  },
  {
    subject: "chemistry",
    examtype: "utme",
    examyear: "2003",
    question: "Which of the following statements is true of sulphur (IV) oxide",
    option: {
      a: "It forms Tetraoxosulphate (VI) acid with water",
      b: "It is an odourless gas",
      c: "It is an acid anhydride",
      d: "It forms white precipitate with acidified barium chloride"
      },
    answer: "c"
  }
]

const typeDefs = gql`
  type optionvalues {
    a: String!
    b: String!
    c: String!
    d: String!
  }
  type Question {
    subject: String!
    examtype: String!
    examyear: String!
    question: String!
    option: optionvalues!
    answer: String!
  }
  type Query {
    questions: [Question!]!
  }
`

const resolvers = {
  Query: {
    questions: () => Questions
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`);
});