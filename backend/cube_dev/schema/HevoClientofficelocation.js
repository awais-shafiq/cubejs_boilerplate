cube(`HevoClientofficelocation`, {
  sql: `SELECT * FROM public.hevo_clientofficelocation`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, city, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    isPrimary: {
      sql: `is_primary`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    zip: {
      sql: `zip`,
      type: `string`
    },
    
    state: {
      sql: `state`,
      type: `string`
    },
    
    city: {
      sql: `city`,
      type: `string`
    },
    
    street: {
      sql: `street`,
      type: `string`
    },
    
    hq: {
      sql: `hq`,
      type: `string`
    },
    
    createdAt: {
      sql: `created_at`,
      type: `time`
    },
    
    updatedAt: {
      sql: `updated_at`,
      type: `time`
    }
  },
  
  dataSource: `default`
});
