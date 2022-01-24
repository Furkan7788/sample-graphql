const { ApolloServer, gql } = require('apollo-server');

const db = require('pg').Pool;

const mngr = new db({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1903',
    port: 5432
});

const typeDefs = gql`
    type crypto{
        asset_id:String
        name:String
        price:Int
        gain:Int
        time:String
    }
   
    type Query{
        AllCoins:[crypto]
        CoinById(id:Int!): crypto
    }
    input CryptoInput {
        asset_id:String
        name:String
        price:Int
        gain:Int
        time:String
    }
    input UpdateInput {
        id:Int!
        name:String
        price:String
        time:String
    }
    type Mutation{
        Insert(payload:CryptoInput) : crypto
        Update(payload:UpdateInput):crypto
        Delete(id:Int!):crypto
    }
`;

const resolvers = {
    Query: {
        AllCoins: async () => {
            const res = await mngr.query("SELECT * FROM crypto")
            console.log(res.rows);
            if (res)
                return res.rows;
        },
        CoinById: async (root, { id }) => {
            const res = await mngr.query("SELECT * FROM crypto WHERE id=$1", [id]);
            console.log(res);
            return res.rows[0];
        }
    },
    Mutation: {
        Insert: async (root, { payload }) => {
            const res = await mngr.query('INSERT INTO crypto (asset_id,name,price,gain,time) VALUES ($1,$2,$3,$4,$5) RETURNING *',
                [payload.asset_id, payload.name, payload.price, payload["gain"], payload.time]);
            id = res.rows[0].id;
            payload.id = id;
            return payload;
        },
       /* Update: async (root, { payload }) => {
            //const res = await mngr.query('UPDATE crypto SET title=$1,description=$2,size=$3 WHERE ID=$4 RETURNING *', [payload.title, payload.description, payload.size, payload.id]);
            // console.log(res);
            //return res.rows[0];
 
        },
        Delete: async (root, { id }) => {
            //const res = await mngr.query('DELETE FROM crypto WHERE ID=$1', [id]);
            // console.log(res);
            //return { DeletedId: id, Result: "Silme işlemi başarılı" };
        }*/
    }
};

const houston = new ApolloServer({ typeDefs, resolvers });
houston.listen({ port: 4445 }).then(({ url }) => {
    console.log(`Houston ${url} kanalı üzerinden dinlemede`);
});
