cube(`HevoTasktemplate`, {
  sql: `SELECT * FROM public.hevo_tasktemplate`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, title]
    }
  },
  
  dimensions: {
    isBillable: {
      sql: `is_billable`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    description: {
      sql: `description`,
      type: `string`
    },
    
    title: {
      sql: `title`,
      type: `string`
    }
  },
  
  dataSource: `default`
});
