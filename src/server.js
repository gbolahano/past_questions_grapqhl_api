import { ApolloServer, gql } from 'apollo-server'
import questions from './questions'

const typeDefs = gql`
  type optionvalues {
    a: String!
    b: String!
    c: String!
    d: String!
  }
  type Question {
    id: ID!
    subject: String!
    examtype: String!
    examyear: Int!
    question: String!
    option: optionvalues!
    answer: String!
  }
  type Query {
    questions(subject: String, examtype: String, examyear: Int): [Question!]!
  }
`

const resolvers = {
  Query: {
    questions: (parent, { subject, examtype, examyear }, ctx, info) =>{
      // Create empty filtered array;
      let filteredArray = [];

      // Check if subject is set and examtype and examyear is undefined;
      if ( typeof subject === 'string' && typeof examtype === 'undefined' && typeof examyear === 'undefined') {
        filteredArray = questions.filter(question => {
          return question.subject == subject
        })
        return filteredArray;
      }
      // Check if subject is set and examtype is undefined and examyear is set;
      if ( typeof subject === 'string' && typeof examtype === 'undefined' && typeof examyear === 'number') {
        filteredArray = questions.filter(question => {
          return question.subject == subject && question.examyear == examyear
        })
        return filteredArray;
      }
      // Check if subject is set and examtype is set and examyear is undefined;
      if ( typeof subject === 'string' && typeof examtype === 'string' && typeof examyear === 'undefined') {
        filteredArray = questions.filter(question => {
          return question.subject == subject && question.examtype == examtype
        })
        return filteredArray;
      }
      // Check if subject is set and examtype is set and examyear is set;
      if ( typeof subject === 'string' && typeof examtype === 'string' && typeof examyear === 'number') {
        filteredArray = questions.filter(question => {
          return question.subject == subject && question.examtype == examtype && question.examyear == examyear
        })
        return filteredArray;
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`);
});