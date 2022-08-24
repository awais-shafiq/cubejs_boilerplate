cube(`HevoSoftware`, {
  sql: `SELECT * FROM public.hevo_software`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id]
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    notes: {
      sql: `notes`,
      type: `string`
    },
    
    login: {
      sql: `login`,
      type: `string`
    },
    
    institution: {
      sql: `institution`,
      type: `string`
    }
  },
  
  dataSource: `default`
});
