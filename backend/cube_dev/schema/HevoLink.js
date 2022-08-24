cube(`HevoLink`, {
  sql: `SELECT * FROM public.hevo_link`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, name]
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    login: {
      sql: `login`,
      type: `string`
    },
    
    notes: {
      sql: `notes`,
      type: `string`
    },
    
    accountDocumentStorage: {
      sql: `account_document_storage`,
      type: `string`
    },
    
    name: {
      sql: `name`,
      type: `string`
    }
  },
  
  dataSource: `default`
});
