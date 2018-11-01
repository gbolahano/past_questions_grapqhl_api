import { ApolloServer, gql } from 'apollo-server'

const questions = [
  {
    id: "12",
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
    id: "13",
    subject: "chemistry",
    examtype: "waec",
    examyear: "2003",
    question: "Which of the following statements is true of sulphur (IV) oxide",
    option: {
      a: "It forms Tetraoxosulphate (VI) acid with water",
      b: "It is an odourless gas",
      c: "It is an acid anhydride",
      d: "It forms white precipitate with acidified barium chloride"
      },
    answer: "c"
  },
  {
    id: "14",
    subject: "physics",
    examtype: "utme",
    examyear: "2010",
    question: "The most likely measurement of length of an object using a venier caliper is: ",
    option: {
      a: "3.0cm ",
      b: "3.3cm ",
      c: "3.33cm ",
      d: "3.333cm"
    },
    answer: "b"
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