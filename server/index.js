const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Connection, query } = require('stardog');

const app = express();
app.use(cors());
app.use(express.json());


const conn = new Connection({
  username: 'endpointAccess', 
  password: 'Project1234@',   
  endpoint: 'https://sd-3927d8ac.stardog.cloud:5820', 
});

// api calls related to police killings
// 1. victim age-groups
// 2. victim gender
// 3. victim race

// victim age groups
app.get('/policeVictimAge', (req, res) => {
  const database = 'project'; 
  const queryText = `PREFIX dbo: <http://dbpedia.org/resource/classes#>
  PREFIX db: <http://dbpedia.org#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
  
  SELECT ?ageGroup (COUNT(?crime) AS ?numCrimes)
  WHERE {
    ?perpetrator a dbo:Perpetrator .
    ?perpetrator db:hasAge ?ageLiteral .
    FILTER(DATATYPE(?ageLiteral) = xsd:integer)
    BIND(xsd:integer(?ageLiteral) AS ?age)
    ?perpetrator db:hasCommitted ?crime .
  
    BIND(
      IF(?age <= 20, "0-20",
        IF(?age > 20 && ?age <= 40, "21-40", ">40")
      ) AS ?ageGroup
    )
  }
  GROUP BY ?ageGroup
  ORDER BY ?ageGroup
  `;


  query.execute(
    conn,
    database,
    queryText,
    'application/sparql-results+json', 
    {
      "default-graph-uri": "tag:stardog:designer:Project:data:PoliceKillingsUS", 
      limit: 100,
      reasoning: true,
      offset: 0
    }
  )
  .then(({ body }) => {
    console.log(body);
    //res.json(body.results.bindings);
    res.json({'<=20' : body.results.bindings[0].numCrimes.value,'21-40' :body.results.bindings[1].numCrimes.value,'>40' :body.results.bindings[2].numCrimes.value })
  })
  .catch((error) => {
    console.error('Query execution error:', error);
    res.status(500).send('Error executing query');
  });
});

// victim - race

app.get('/policeVictimRace', (req, res) => {
  const database = 'project'; 
  const queryText = `PREFIX dbo: <http://dbpedia.org/resource/classes#>
  PREFIX db: <http://dbpedia.org#>
  PREFIX test: <http://www.semanticweb.org/ajink/ontologies/2023/10/untitled-ontology-13#>
  
  SELECT ?race (COUNT(?crime) AS ?numCrimes)
  WHERE {
    ?perpetrator a dbo:Perpetrator .
    ?perpetrator test:hasRace ?race .
    ?perpetrator db:hasCommitted ?crime .
  }
  GROUP BY ?race
  ORDER BY DESC(?numCrimes)`;


  query.execute(
    conn,
    database,
    queryText,
    'application/sparql-results+json', 
    {
      "default-graph-uri": "tag:stardog:designer:Project:data:PoliceKillingsUS", 
      limit: 100,
      reasoning: true,
      offset: 0
    }
  )
  .then(({ body }) => {
    console.log(body);
    //res.json(body.results.bindings);
    res.json({'White' : body.results.bindings[0].numCrimes.value,'Black' :body.results.bindings[1].numCrimes.value,'Hispanic' :body.results.bindings[2].numCrimes.value, 'Asian' :body.results.bindings[3].numCrimes.value, 'Native American' :body.results.bindings[4].numCrimes.value, 'Other' :body.results.bindings[5].numCrimes.value })
  })
  .catch((error) => {
    console.error('Query execution error:', error);
    res.status(500).send('Error executing query');
  });
});

// victim gender

app.get('/policeVictimGender', (req, res) => {
  const database = 'project'; 
  const queryText = `PREFIX dbo: <http://dbpedia.org/resource/classes#>
  PREFIX db: <http://dbpedia.org#>
  PREFIX test: <http://www.semanticweb.org/ajink/ontologies/2023/10/untitled-ontology-13#>
  
  SELECT ?race (COUNT(?crime) AS ?numCrimes)
  WHERE {
    ?perpetrator a dbo:Perpetrator .
    ?perpetrator test:hasRace ?race .
    ?perpetrator db:hasCommitted ?crime .
  }
  GROUP BY ?race
  ORDER BY DESC(?numCrimes)`;


  query.execute(
    conn,
    database,
    queryText,
    'application/sparql-results+json', 
    {
      "default-graph-uri": "tag:stardog:designer:Project:data:PoliceKillingsUS", 
      limit: 100,
      reasoning: true,
      offset: 0
    }
  )
  .then(({ body }) => {
    console.log(body);
    //res.json(body.results.bindings);
    res.json({'Male' : body.results.bindings[0].numCrimes.value,'Female' :body.results.bindings[1].numCrimes.value }) ;
  })
  .catch((error) => {
    console.error('Query execution error:', error);
    res.status(500).send('Error executing query');
  });
});

// bar graph of LA-crime data

app.get('/crimeInLosAngeles', (req, res) => {
  const database = 'project'; 
  const queryText = `
    PREFIX db: <http://dbpedia.org#>
    
    SELECT ?crimeType (COUNT(?crime) AS ?numberOfCrimes)
    WHERE {
      ?crime a db:Crime .
      ?crime db:crimeType ?crimeType .
    }
    GROUP BY ?crimeType
    HAVING (COUNT(?crime) > 50000)
    ORDER BY DESC(?numberOfCrimes)
  `;

  query.execute(
    conn,
    database,
    queryText,
    'application/sparql-results+json', 
    {
      "default-graph-uri": "tag:stardog:designer:Project:data:Crime_Data_from_2020_to_Present_(1)", 
      limit: 100,
      reasoning: true,
      offset: 0
    }
  )
  .then(({ body }) => {
    console.log(body);
    //res.json(body.results.bindings);
    res.json({'VEHICLE - STOLEN' : body.results.bindings[0].numberOfCrimes.value,'BATTERY - SIMPLE ASSAULT' :body.results.bindings[1].numberOfCrimes.value, 'THEFT OF IDENTITY' :body.results.bindings[2].numberOfCrimes.value, 'BURGLARY FROM VEHICLE' :body.results.bindings[3].numberOfCrimes.value, 'VANDALISM - FELONY' :body.results.bindings[4].numberOfCrimes.value }) ;
  })
  .catch((error) => {
    console.error('Query execution error:', error);
    res.status(500).send('Error executing query');
  });
});

// hit map of new york killings

app.get('/newYorkCrimes', (req, res) => {
  const database = 'project'; 
  const queryText = `PREFIX db: <http://dbpedia.org#>

  SELECT ?location (COUNT(?crime) AS ?numberOfCrimes)
  WHERE {
    ?crime a db:Crime .
    ?crime db:committedIn ?location .
  }
  GROUP BY ?location
  HAVING(COUNT(?crime) > 10)
  ORDER BY DESC(?numberOfCrimes)`;

  query.execute(
    conn,
    database,
    queryText,
    'application/sparql-results+json', 
    {
      "default-graph-uri": "tag:stardog:designer:Project:data:NYPD_Shooting_Incident_Data__Historic__(1)", 
      limit: 100,
      reasoning: true,
      offset: 0
    }
  )
  .then(({ body }) => {
    console.log(body);
    //res.json(body.results.bindings);
    res.json({'BROOKLYN' : body.results.bindings[0].numberOfCrimes.value,'BRONX' :body.results.bindings[1].numberOfCrimes.value, 'QUEENS' :body.results.bindings[2].numberOfCrimes.value, 'MANHATTAN' :body.results.bindings[3].numberOfCrimes.value, 'STATEN ISLAND' :body.results.bindings[4].numberOfCrimes.value }) ;
  })
  .catch((error) => {
    console.error('Query execution error:', error);
    res.status(500).send('Error executing query');
  });
});



const port = process.env.PORT || 4500;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
