cube(`HevoClientworkflow`, {
  sql: `SELECT * FROM public.hevo_clientworkflow`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, createdAt, updatedAt, startDate]
    }
  },
  
  dimensions: {
    isActive: {
      sql: `is_active`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    repeatType: {
      sql: `repeat_type`,
      type: `string`
    },
    
    version: {
      sql: `version`,
      type: `string`
    },
    
    createdAt: {
      sql: `created_at`,
      type: `time`
    },
    
    updatedAt: {
      sql: `updated_at`,
      type: `time`
    },
    
    startDate: {
      sql: `start_date`,
      type: `time`
    }
  },
  
  dataSource: `default`
});
