module.exports = {
    client: {
        include: ["./src/**/*.tsx"],
        tagName: "gql",
        service: {
            name: "uber-eats-backend",
            url: "http://localhost:4000/graphql"
        }
    }
}