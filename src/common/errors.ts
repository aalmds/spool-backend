
export enum Errors {
  READ_RECORD = 'Error when adding read record to database.',
  GET_UNREAD_RECORDS = 'Error when getting unread records from database.',
  GET_READ_RECORD = 'Error when getting read record from database.',
  GET_EDUCATIONISTS_BY_CHILD_ID = 'Error when getting educationist by child id.',
  GET_THERAPISTS_BY_CHILD_ID = 'Error when getting therapist by child id.',
  GET_CHILDREN_BY_EDUCATIONIST = 'Error when getting children by educationist.',
  GET_CHILDREN_BY_THERAPIST = 'Error when getting children by therapist',
  CREATE_THERAPIST = 'Error when creating therapist',
  GET_RECORDS = 'Error when getting records from database.',
  GET_USER = 'Error when getting user from database.',
  CREATE_RECORD = 'Error when creating record in database.',
  SAVE_DEVICE_TOKEN = 'Error when saving device token in database.',
  GET_USER_INFO = 'Error when getting user info from database.',
  SEND_NOTIFICATION = 'Error when sending notification.',
  INVALID_ROLE = 'Invalid role! Valid roles are Child, Therapist, and Educationist.',
}