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
      drillMembers: [id, country, city, name, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    zipCode: {
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
    
    logoUrl: {
      sql: `logo_url`,
      type: `string`
    },
    
    phone: {
      sql: `phone`,
      type: `string`
    },
    
    businessType: {
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
