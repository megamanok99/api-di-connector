export const mokedInterface = {
  PabpRDomainEntity: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        format: 'int64',
      },
      loginPrefix: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      alias: {
        type: 'string',
      },
      code: {
        type: 'string',
      },
      federationLink: {
        type: 'string',
      },
    },
  },
  PabpRGroupEntity: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
    },
  },
  PabpRRoleEntity: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      code: {
        type: 'string',
      },
      realmId: {
        type: 'string',
      },
    },
  },
  UserEntityDTO: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      unsiUserId: {
        type: 'integer',
        format: 'int64',
      },
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      roles: {
        uniqueItems: true,
        type: 'array',
        items: {
          $ref: '#/components/schemas/PabpRRoleEntity',
        },
      },
      subdivision: {
        type: 'string',
      },
      subdivisionTxt: {
        type: 'string',
      },
      groups: {
        uniqueItems: true,
        type: 'array',
        items: {
          $ref: '#/components/schemas/PabpRGroupEntity',
        },
      },
      email: {
        type: 'string',
      },
      realmId: {
        type: 'string',
      },
      login: {
        type: 'string',
      },
      created: {
        type: 'string',
        format: 'date-time',
      },
      password: {
        type: 'string',
      },
      active: {
        type: 'boolean',
      },
      isUnsi: {
        type: 'boolean',
      },
      position: {
        type: 'string',
      },
      domain: {
        $ref: '#/components/schemas/PabpRDomainEntity',
      },
      label: {
        type: 'string',
      },
      updatedDate: {
        type: 'string',
        format: 'date-time',
      },
    },
  },
  FilterRequest: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
      },
      operator: {
        type: 'string',
        enum: ['EQUAL', 'NOT_EQUAL', 'LIKE', 'LIKE_ANY', 'IN', 'BETWEEN', 'IS_NULL', 'IS_NOT_NULL'],
      },
      field_type: {
        type: 'string',
        enum: ['BOOLEAN', 'TIMESTAMP', 'DATE', 'DOUBLE', 'INTEGER', 'LONG', 'STRING'],
      },
      value: {
        type: 'object',
      },
      value_to: {
        type: 'object',
      },
      values: {
        type: 'array',
        items: {
          type: 'object',
        },
      },
    },
  },
  SearchRequest: {
    type: 'object',
    properties: {
      filters: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/FilterRequest',
        },
      },
      sorts: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/SortRequest',
        },
      },
      page: {
        type: 'integer',
        format: 'int32',
      },
      size: {
        type: 'integer',
        format: 'int32',
      },
    },
  },
  SortRequest: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
      },
      direction: {
        type: 'string',
        enum: ['ASC', 'DESC'],
      },
    },
  },
  AbstractResponseDTO: {
    type: 'object',
    properties: {
      content: {
        type: 'object',
      },
      totalElements: {
        type: 'integer',
        format: 'int64',
      },
      totalPages: {
        type: 'integer',
        format: 'int32',
      },
    },
  },
  KeyclockFioSearchDTO: {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      ldapFederation: {
        type: 'string',
      },
      page: {
        type: 'integer',
        format: 'int32',
      },
      limit: {
        type: 'integer',
        format: 'int32',
      },
    },
  },
  GroupRepresentation: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      path: {
        type: 'string',
      },
      attributes: {
        type: 'object',
        additionalProperties: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      realmRoles: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      clientRoles: {
        type: 'object',
        additionalProperties: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      subGroups: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/GroupRepresentation',
        },
      },
      access: {
        type: 'object',
        additionalProperties: {
          type: 'boolean',
        },
      },
    },
  },
  PabpRUserEntity: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      unsiUserId: {
        type: 'integer',
        format: 'int64',
      },
      login: {
        type: 'string',
      },
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      roles: {
        uniqueItems: true,
        type: 'array',
        items: {
          $ref: '#/components/schemas/PabpRRoleEntity',
        },
      },
      subdivision: {
        type: 'string',
      },
      groups: {
        uniqueItems: true,
        type: 'array',
        items: {
          $ref: '#/components/schemas/PabpRGroupEntity',
        },
      },
      email: {
        type: 'string',
      },
      realmId: {
        type: 'string',
      },
      created: {
        type: 'string',
        format: 'date-time',
      },
      password: {
        type: 'string',
      },
      active: {
        type: 'boolean',
      },
      position: {
        type: 'string',
      },
      updatedDate: {
        type: 'string',
        format: 'date-time',
      },
      domain: {
        $ref: '#/components/schemas/PabpRDomainEntity',
      },
      subdivisionTxt: {
        type: 'string',
      },
    },
  },
};
