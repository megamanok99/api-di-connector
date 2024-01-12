export const paths = {
  '/user/updateUserSettings': {
    post: {
      tags: ['user'],
      summary: 'Изменить пользователя',
      operationId: 'updateUser',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserEntity',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'OK',
          content: {
            '*/*': {
              schema: {
                $ref: '#/components/schemas/UserEntity',
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  '/user/saveUser': {
    post: {
      tags: ['user'],
      summary: 'Сохранить пользователя',
      operationId: 'saveUser',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserEntity',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'OK',
          content: {
            '*/*': {
              schema: {
                $ref: '#/components/schemas/UserEntity',
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  '/setNoticeRead/{id}': {
    post: {
      tags: ['notifications'],
      summary: 'Пометить сообщение прочитанным',
      operationId: 'setMsgRead',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            '*/*': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/NotificationDto',
                },
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  '/setNoticeDelete/{id}': {
    post: {
      tags: ['notifications'],
      summary: 'Пометить сообщение удаленным',
      operationId: 'setMsgDelete',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            '*/*': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/NotificationDto',
                },
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  '/setAllNoticeRead/{receiverId}': {
    post: {
      tags: ['notifications'],
      summary: 'Пометить все сообщения пользователя прочитанными',
      operationId: 'setAllMsgRead',
      parameters: [
        {
          name: 'receiverId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            '*/*': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/NotificationDto',
                },
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  '/sendMsgs': {
    post: {
      tags: ['notifications'],
      summary: 'Отправить сообщения в kafka',
      operationId: 'sendMsg',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/NotificationDto',
              },
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'OK',
          content: {
            '*/*': {
              schema: {
                $ref: '#/components/schemas/NotificationDto',
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  '/sendMsg': {
    post: {
      tags: ['notifications'],
      summary: 'Отправить сообщение в kafka',
      operationId: 'sendMsg_1',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/NotificationDto',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'OK',
          content: {
            '*/*': {
              schema: {
                $ref: '#/components/schemas/NotificationDto',
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  '/email/sendOld/{email}': {
    post: {
      tags: ['email-controller'],
      summary: 'Отправить письмо/сообщение на email пользователя  ',
      operationId: 'sendSimpleEmail',
      parameters: [
        {
          name: 'email',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'OK',
          content: {
            '*/*': {
              schema: {
                type: 'string',
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  '/email/sendAttach/{email}': {
    post: {
      tags: ['email-controller'],
      operationId: 'sendEmailAttachment',
      parameters: [
        {
          name: 'email',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'OK',
          content: {
            '*/*': {
              schema: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
  '/email/send/{email}': {
    post: {
      tags: ['email-controller'],
      summary: 'Отправить письмо/сообщение на email пользователя  Авторизация',
      operationId: 'sendAuthEmail',
      parameters: [
        {
          name: 'email',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'OK',
          content: {
            '*/*': {
              schema: {
                type: 'string',
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  '/user/getUserById/{userId}': {
    get: {
      tags: ['user'],
      summary: 'Получить пользователя по userId',
      operationId: 'getUserById',
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            '*/*': {
              schema: {
                $ref: '#/components/schemas/UserEntity',
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  '/user/getAllUsers': {
    get: {
      tags: ['user'],
      summary: 'Получить всех пользователей',
      operationId: 'getAllUsers',
      responses: {
        200: {
          description: 'OK',
          content: {
            '*/*': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/UserEntity',
                },
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  '/getCountNotDelAndNotReadMsg/{receiverId}': {
    get: {
      tags: ['notifications'],
      summary: 'Получить количество всех не удаленных и не прочитанных сообщений',
      operationId: 'getCountNotDelAndNotRedMsg',
      parameters: [
        {
          name: 'receiverId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            '*/*': {
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  '/getAllNotDeletedMsg/{receiverId}': {
    get: {
      tags: ['notifications'],
      summary: 'Получить список всех не удаленных сообщений',
      operationId: 'getAllNotDeletedMsg',
      parameters: [
        {
          name: 'receiverId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            '*/*': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/NotificationDto',
                },
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  '/getAllNotDelAndNotReadMsg/{receiverId}': {
    get: {
      tags: ['notifications'],
      summary: 'Получить список всех не удаленных и не прочитанных сообщений',
      operationId: 'getAllNotDelAndNotReadMsg',
      parameters: [
        {
          name: 'receiverId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            '*/*': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/NotificationDto',
                },
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  '/getAllMsg/{receiverId}': {
    get: {
      tags: ['notifications'],
      summary: 'Получить список всех сообщений',
      operationId: 'getAllMsg',
      parameters: [
        {
          name: 'receiverId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            '*/*': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/NotificationDto',
                },
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  '/': {
    get: {
      tags: ['swagger-controller'],
      operationId: 'root',
      responses: {
        200: {
          description: 'OK',
        },
      },
    },
  },
};
