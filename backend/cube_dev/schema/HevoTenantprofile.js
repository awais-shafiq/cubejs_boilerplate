cube(`HevoTenantprofile`, {
  sql: `SELECT * FROM public.hevo_tenantprofile`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, country, city, name, created_at, updated_at]
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    zip_code: {
      sql: `zip_code`,
      type: `string`
    },
    
    country: {
      sql: `country`,
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
    
    address: {
      sql: `address`,
      type: `string`
    },
    
    webUrl: {
      sql: `web_url`,
      type: `string`
    },
    
    logo_url: {
      sql: `logo_url`,
      type: `string`
    },
    
    phone: {
      sql: `phone`,
      type: `string`
    },
    
    business_type: {
      sql: `business_type`,
      type: `string`
    },
    
    industry: {
      sql: `industry`,
      type: `string`
    },
    
    dba: {
      sql: `dba`,
      type: `string`
    },
    
    name: {
      sql: `name`,
      type: `string`
    },
    
    created_at: {
      sql: `created_at`,
      type: `time`
    },
    
    updated_at: {
      sql: `updated_at`,
      type: `time`
    }
  },
  
  dataSource: `default`
});
