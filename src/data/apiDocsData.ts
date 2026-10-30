/**
 * LattiumHR API Documentation Dataset
 * Generated from External_API_Integration_Documentation.docx
 * Contains 32 verified endpoints across 6 functional modules with full schemas,
 * headers, multi-language snippets, and status code responses.
 */

export interface HeaderItem {
  key: string;
  value: string;
}

export interface ParameterItem {
  name: string;
  in: "path" | "query";
  type: string;
  required: boolean;
  description: string;
}

export interface RequestBodyField {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ResponseItem {
  status: string;
  code: number;
  body: string;
}

export interface CodeSnippets {
  curl: string;
  js: string;
  python: string;
  http: string;
}

export interface ApiEndpoint {
  id: number;
  number: number;
  module: string;
  moduleShortName: string;
  moduleId: string;
  name: string;
  shortName: string;
  description: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpointUrl: string;
  headers: string[];
  headersTable: HeaderItem[];
  parameters: ParameterItem[];
  requestBody?: string | null;
  requestBodyFields: RequestBodyField[];
  responses: ResponseItem[];
  codeSnippets: CodeSnippets;
  note?: string | null;
}

export interface ApiModule {
  id: string;
  name: string;
  shortName: string;
  description: string;
  apiCount: number;
  apiNumbers: number[];
}

export const API_MODULES: ApiModule[] = [
  {
    "id": "authentication",
    "name": "Authentication",
    "shortName": "Authentication",
    "apiCount": 4,
    "apiIds": [
      1,
      2,
      4,
      5
    ]
  },
  {
    "id": "employee-onboarding",
    "name": "Employee Onboarding",
    "shortName": "Onboarding",
    "apiCount": 5,
    "apiIds": [
      17,
      18,
      19,
      20,
      21
    ]
  },
  {
    "id": "payroll",
    "name": "Payroll",
    "shortName": "Payroll",
    "apiCount": 7,
    "apiIds": [
      22,
      23,
      24,
      25,
      26,
      27,
      32
    ]
  },
  {
    "id": "asset-management",
    "name": "Asset Management",
    "shortName": "Assets",
    "apiCount": 8,
    "apiIds": [
      34,
      35,
      36,
      37,
      38,
      39,
      41,
      42
    ]
  },
  {
    "id": "survey",
    "name": "Survey",
    "shortName": "Survey",
    "apiCount": 5,
    "apiIds": [
      45,
      46,
      47,
      50,
      51
    ]
  },
  {
    "id": "employee-offboarding",
    "name": "Employee Offboarding",
    "shortName": "Offboarding",
    "apiCount": 3,
    "apiIds": [
      52,
      53,
      57
    ]
  }
];

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    "id": 1,
    "number": 1,
    "module": "Authentication",
    "moduleShortName": "Authentication",
    "moduleId": "authentication",
    "name": "Initiate login and send OTP",
    "shortName": "Initiate login",
    "description": "Submit account credentials to start sign-in. If valid, a 6-digit OTP is emailed and expires in 300 seconds.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/auth/login",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "{\n  \"email\": \"intechmanager@gmail.com\",\n  \"password\": \"12345678\"\n}",
    "requestBodyFields": [
      {
        "name": "email",
        "type": "string",
        "required": true,
        "description": "Registered corporate or candidate email address"
      },
      {
        "name": "password",
        "type": "string",
        "required": true,
        "description": "Account security password"
      }
    ],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/auth/login\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -d '{\n    \"email\": \"intechmanager@gmail.com\",\n    \"password\": \"12345678\"\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/auth/login\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify({\n    \"email\": \"intechmanager@gmail.com\",\n    \"password\": \"12345678\"\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/auth/login\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\"\n}\npayload = {\n  \"email\": \"intechmanager@gmail.com\",\n  \"password\": \"12345678\"\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/auth/login HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json\n\n{\n  \"email\": \"intechmanager@gmail.com\",\n  \"password\": \"12345678\"\n}"
    },
    "note": null
  },
  {
    "id": 2,
    "number": 2,
    "module": "Authentication",
    "moduleShortName": "Authentication",
    "moduleId": "authentication",
    "name": "Verify OTP and issue JWT session token",
    "shortName": "Verify OTP",
    "description": "Verify OTP code received by user and obtain a JWT bearer token for authorized API access.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/auth/verify-otp",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "{\n  \"email\": \"intechmanager@gmail.com\",\n  \"otp\": \"123456\"\n}",
    "requestBodyFields": [
      {
        "name": "email",
        "type": "string",
        "required": true,
        "description": "Registered corporate or candidate email address"
      },
      {
        "name": "otp",
        "type": "string",
        "required": true,
        "description": "6-digit one-time password sent via email"
      }
    ],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/auth/verify-otp\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -d '{\n    \"email\": \"intechmanager@gmail.com\",\n    \"otp\": \"123456\"\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/auth/verify-otp\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify({\n    \"email\": \"intechmanager@gmail.com\",\n    \"otp\": \"123456\"\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/auth/verify-otp\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\"\n}\npayload = {\n  \"email\": \"intechmanager@gmail.com\",\n  \"otp\": \"123456\"\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/auth/verify-otp HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json\n\n{\n  \"email\": \"intechmanager@gmail.com\",\n  \"otp\": \"123456\"\n}"
    },
    "note": null
  },
  {
    "id": 4,
    "number": 4,
    "module": "Authentication",
    "moduleShortName": "Authentication",
    "moduleId": "authentication",
    "name": "Terminate session and invalidate token",
    "shortName": "Logout",
    "description": "Terminate the active session and invalidate the bearer token.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/auth/logout",
    "headers": [
      "Accept: application/json",
      "Authorization: Bearer {{bearerToken}}"
    ],
    "headersTable": [
      {
        "key": "Accept",
        "value": "application/json"
      },
      {
        "key": "Authorization",
        "value": "Bearer {{bearerToken}}"
      }
    ],
    "parameters": [],
    "requestBody": "Saved response examples:\n• Logout successful (200 OK)",
    "requestBodyFields": [],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/auth/logout\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer {{bearerToken}}\" \\\n  -d 'Saved response examples:\n  • Logout successful (200 OK)'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/auth/logout\", {\n  method: \"POST\",\n  headers: {\n    \"Accept\": \"application/json\",\n    \"Authorization\": \"Bearer {{bearerToken}}\"\n  },\n  body: JSON.stringify(Saved response examples:\n  • Logout successful (200 OK))\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/auth/logout\"\nheaders = {\n  \"Accept\": \"application/json\",\n  \"Authorization\": \"Bearer {{bearerToken}}\"\n}\npayload = Saved response examples:\n• Logout successful (200 OK)\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/auth/logout HTTP/1.1\nHost: api.lattiumhr.com\nAccept: application/json\nAuthorization: Bearer {{bearerToken}}\n\nSaved response examples:\n• Logout successful (200 OK)"
    },
    "note": null
  },
  {
    "id": 5,
    "number": 5,
    "module": "Authentication",
    "moduleShortName": "Authentication",
    "moduleId": "authentication",
    "name": "Get active permissions for authenticated user",
    "shortName": "Permissions",
    "description": "Retrieve the active role and granular functional permissions for the authenticated account.",
    "method": "GET",
    "endpointUrl": "{{baseUrl}}/api/auth/me/permissions",
    "headers": [
      "Accept: application/json",
      "Authorization: Bearer {{bearerToken}}"
    ],
    "headersTable": [
      {
        "key": "Accept",
        "value": "application/json"
      },
      {
        "key": "Authorization",
        "value": "Bearer {{bearerToken}}"
      }
    ],
    "parameters": [],
    "requestBody": "Saved response examples:\n• User permission list (200 OK)",
    "requestBodyFields": [],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X GET \\\n  \"{{baseUrl}}/api/auth/me/permissions\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer {{bearerToken}}\" \\\n  -d 'Saved response examples:\n  • User permission list (200 OK)'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/auth/me/permissions\", {\n  method: \"GET\",\n  headers: {\n    \"Accept\": \"application/json\",\n    \"Authorization\": \"Bearer {{bearerToken}}\"\n  },\n  body: JSON.stringify(Saved response examples:\n  • User permission list (200 OK))\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/auth/me/permissions\"\nheaders = {\n  \"Accept\": \"application/json\",\n  \"Authorization\": \"Bearer {{bearerToken}}\"\n}\npayload = Saved response examples:\n• User permission list (200 OK)\n\nresponse = requests.get(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "GET /api/auth/me/permissions HTTP/1.1\nHost: api.lattiumhr.com\nAccept: application/json\nAuthorization: Bearer {{bearerToken}}\n\nSaved response examples:\n• User permission list (200 OK)"
    },
    "note": null
  },
  {
    "id": 17,
    "number": 17,
    "module": "Employee Onboarding",
    "moduleShortName": "Onboarding",
    "moduleId": "employee-onboarding",
    "name": "Send an email invitation to a new candidate for pre-onboarding",
    "shortName": "Invite Candidate",
    "description": "Send an email invitation to a new candidate with onboarding credentials and organizational structure.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/employees/onboarding/invite",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "{\n  \"candidateEmail\": \"arun.personal@gmail.com\",\n  \"candidateName\": \"Arun Patel\",\n  \"designationId\": 5,\n  \"departmentId\": 2,\n  \"tentativeJoiningDate\": \"2026-11-01\",\n  \"roleId\": 3\n}",
    "requestBodyFields": [
      {
        "name": "candidateEmail",
        "type": "string",
        "required": true,
        "description": "Registered corporate or candidate email address"
      },
      {
        "name": "candidateName",
        "type": "string",
        "required": true,
        "description": "Candidate name"
      },
      {
        "name": "designationId",
        "type": "number",
        "required": true,
        "description": "Unique foreign-key identifier for designation"
      },
      {
        "name": "departmentId",
        "type": "number",
        "required": true,
        "description": "Unique foreign-key identifier for department"
      },
      {
        "name": "tentativeJoiningDate",
        "type": "string",
        "required": true,
        "description": "ISO-8601 formatted date (YYYY-MM-DD)"
      },
      {
        "name": "roleId",
        "type": "number",
        "required": true,
        "description": "Unique foreign-key identifier for role"
      }
    ],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/employees/onboarding/invite\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -d '{\n    \"candidateEmail\": \"arun.personal@gmail.com\",\n    \"candidateName\": \"Arun Patel\",\n    \"designationId\": 5,\n    \"departmentId\": 2,\n    \"tentativeJoiningDate\": \"2026-11-01\",\n    \"roleId\": 3\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/employees/onboarding/invite\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify({\n    \"candidateEmail\": \"arun.personal@gmail.com\",\n    \"candidateName\": \"Arun Patel\",\n    \"designationId\": 5,\n    \"departmentId\": 2,\n    \"tentativeJoiningDate\": \"2026-11-01\",\n    \"roleId\": 3\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/employees/onboarding/invite\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\"\n}\npayload = {\n  \"candidateEmail\": \"arun.personal@gmail.com\",\n  \"candidateName\": \"Arun Patel\",\n  \"designationId\": 5,\n  \"departmentId\": 2,\n  \"tentativeJoiningDate\": \"2026-11-01\",\n  \"roleId\": 3\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/employees/onboarding/invite HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json\n\n{\n  \"candidateEmail\": \"arun.personal@gmail.com\",\n  \"candidateName\": \"Arun Patel\",\n  \"designationId\": 5,\n  \"departmentId\": 2,\n  \"tentativeJoiningDate\": \"2026-11-01\",\n  \"roleId\": 3\n}"
    },
    "note": "designationId references a designation; obtain the designation ID from /api/designations. departmentId references a department; obtain the department ID from GET/POST /api/departments. roleId references a role; obtain the role ID from /api/roles."
  },
  {
    "id": 18,
    "number": 18,
    "module": "Employee Onboarding",
    "moduleShortName": "Onboarding",
    "moduleId": "employee-onboarding",
    "name": "Get full 360-degree employee profile details",
    "shortName": "Get Profile",
    "description": "Retrieve the comprehensive 360-degree employee profile, including department, manager, and bank details.",
    "method": "GET",
    "endpointUrl": "{{baseUrl}}/api/employees/:id",
    "headers": [
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "type": "string | number",
        "required": true,
        "description": "id (example: 145)"
      }
    ],
    "requestBody": "Path variables: id (example: 145)\nSaved response examples:\n• Detailed employee profile (200 OK)",
    "requestBodyFields": [],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X GET \\\n  \"{{baseUrl}}/api/employees/:id\" \\\n  -H \"Accept: application/json\" \\\n  -d 'Path variables: id (example: 145)\n  Saved response examples:\n  • Detailed employee profile (200 OK)'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/employees/:id\", {\n  method: \"GET\",\n  headers: {\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify(Path variables: id (example: 145)\n  Saved response examples:\n  • Detailed employee profile (200 OK))\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/employees/:id\"\nheaders = {\n  \"Accept\": \"application/json\"\n}\npayload = Path variables: id (example: 145)\nSaved response examples:\n• Detailed employee profile (200 OK)\n\nresponse = requests.get(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "GET /api/employees/:id HTTP/1.1\nHost: api.lattiumhr.com\nAccept: application/json\n\nPath variables: id (example: 145)\nSaved response examples:\n• Detailed employee profile (200 OK)"
    },
    "note": null
  },
  {
    "id": 19,
    "number": 19,
    "module": "Employee Onboarding",
    "moduleShortName": "Onboarding",
    "moduleId": "employee-onboarding",
    "name": "Update employee profile fields",
    "shortName": "Update Profile",
    "description": "Update mutable employee attributes such as phone, address, and designation.",
    "method": "PUT",
    "endpointUrl": "{{baseUrl}}/api/employees/:id",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "type": "string | number",
        "required": true,
        "description": "id (example: 145)"
      }
    ],
    "requestBody": "{\n  \"phone\": \"+919876599999\",\n  \"designationId\": 6\n}",
    "requestBodyFields": [
      {
        "name": "phone",
        "type": "string",
        "required": true,
        "description": "Phone"
      },
      {
        "name": "designationId",
        "type": "number",
        "required": true,
        "description": "Unique foreign-key identifier for designation"
      }
    ],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X PUT \\\n  \"{{baseUrl}}/api/employees/:id\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -d '{\n    \"phone\": \"+919876599999\",\n    \"designationId\": 6\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/employees/:id\", {\n  method: \"PUT\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify({\n    \"phone\": \"+919876599999\",\n    \"designationId\": 6\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/employees/:id\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\"\n}\npayload = {\n  \"phone\": \"+919876599999\",\n  \"designationId\": 6\n}\n\nresponse = requests.put(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "PUT /api/employees/:id HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json\n\n{\n  \"phone\": \"+919876599999\",\n  \"designationId\": 6\n}"
    },
    "note": "designationId references a designation; obtain the designation ID from /api/designations."
  },
  {
    "id": 20,
    "number": 20,
    "module": "Employee Onboarding",
    "moduleShortName": "Onboarding",
    "moduleId": "employee-onboarding",
    "name": "List employees with pagination and filters",
    "shortName": "List Employees",
    "description": "List all employees with pagination, department filters, and status flags.",
    "method": "GET",
    "endpointUrl": "{{baseUrl}}/api/employees",
    "headers": [
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "Saved response examples:\n• Paginated employee list (200 OK)",
    "requestBodyFields": [],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X GET \\\n  \"{{baseUrl}}/api/employees\" \\\n  -H \"Accept: application/json\" \\\n  -d 'Saved response examples:\n  • Paginated employee list (200 OK)'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/employees\", {\n  method: \"GET\",\n  headers: {\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify(Saved response examples:\n  • Paginated employee list (200 OK))\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/employees\"\nheaders = {\n  \"Accept\": \"application/json\"\n}\npayload = Saved response examples:\n• Paginated employee list (200 OK)\n\nresponse = requests.get(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "GET /api/employees HTTP/1.1\nHost: api.lattiumhr.com\nAccept: application/json\n\nSaved response examples:\n• Paginated employee list (200 OK)"
    },
    "note": null
  },
  {
    "id": 21,
    "number": 21,
    "module": "Employee Onboarding",
    "moduleShortName": "Onboarding",
    "moduleId": "employee-onboarding",
    "name": "Create & onboard a new employee",
    "shortName": "Create Employee",
    "description": "Create and onboard a new employee record with role credentials and salary band assignment.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/employees",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "{\n  \"email\": \"arun.patel@company.com\",\n  \"password\": \"SecurePassword123!\",\n  \"role_id\": 51,\n  \"first_name\": \"Arun\",\n  \"last_name\": \"Patel\",\n  \"date_of_birth\": \"1995-05-15\",\n  \"gender\": \"Male\",\n  \"phone\": \"+919876543210\",\n  \"secondary_email\": \"arun.personal@gmail.com\",\n  \"address\": \"Prestige Tech Park, Outer Ring Road\",\n  \"city\": \"Bengaluru\",\n  \"state\": \"Karnataka\",\n  \"zip\": \"560103\",\n  \"country\": \"India\",\n  \"emergency_contact\": \"Pooja Patel\",\n  \"emergency_relationship\": \"SPOUSE\",\n  \"emergency_phone\": \"+919876500000\",\n  \"employee_id\": \"EMP-2026-089\",\n  \"department_id\": 15,\n  \"designation_id\": 21,\n  \"employment_type\": \"Full-time\",\n  \"start_date\": \"2026-11-01\",\n  \"work_location\": \"Bengaluru Headquarters\",\n  \"base_salary\": 85000,\n  \"currency\": \"INR\",\n  \"bank_name\": \"HDFC Bank\",\n  \"account_holder_name\": \"Arun Patel\",\n  \"account_number\": \"50100234567890\",\n  \"ifsc_code\": \"HDFC0001234\",\n  \"branch_name\": \"Indiranagar, Bangalore\",\n  \"education\": [\n    {\n      \"qualification\": \"10th Grade (Secondary)\",\n      \"level\": \"SECONDARY\",\n      \"institution_name\": \"Delhi Public School\",\n      \"year_of_passing\": 2011,\n      \"score\": \"88%\"\n    },\n    {\n      \"qualification\": \"12th Grade (Senior Secondary)\",\n      \"level\": \"HIGHER_SECONDARY\",\n      \"institution_name\": \"Delhi Public School\",\n      \"year_of_passing\": 2013,\n      \"score\": \"91%\"\n    }\n  ]\n}",
    "requestBodyFields": [
      {
        "name": "email",
        "type": "string",
        "required": true,
        "description": "Registered corporate or candidate email address"
      },
      {
        "name": "password",
        "type": "string",
        "required": true,
        "description": "Account security password"
      },
      {
        "name": "role_id",
        "type": "number",
        "required": true,
        "description": "Role id"
      },
      {
        "name": "first_name",
        "type": "string",
        "required": true,
        "description": "First name"
      },
      {
        "name": "last_name",
        "type": "string",
        "required": true,
        "description": "Last name"
      },
      {
        "name": "date_of_birth",
        "type": "string",
        "required": true,
        "description": "Date of birth"
      },
      {
        "name": "gender",
        "type": "string",
        "required": true,
        "description": "Gender"
      },
      {
        "name": "phone",
        "type": "string",
        "required": true,
        "description": "Phone"
      },
      {
        "name": "secondary_email",
        "type": "string",
        "required": true,
        "description": "Secondary email"
      },
      {
        "name": "address",
        "type": "string",
        "required": true,
        "description": "Address"
      },
      {
        "name": "city",
        "type": "string",
        "required": true,
        "description": "City"
      },
      {
        "name": "state",
        "type": "string",
        "required": true,
        "description": "State"
      },
      {
        "name": "zip",
        "type": "string",
        "required": true,
        "description": "Zip"
      },
      {
        "name": "country",
        "type": "string",
        "required": true,
        "description": "Country"
      },
      {
        "name": "emergency_contact",
        "type": "string",
        "required": true,
        "description": "Emergency contact"
      },
      {
        "name": "emergency_relationship",
        "type": "string",
        "required": true,
        "description": "Emergency relationship"
      },
      {
        "name": "emergency_phone",
        "type": "string",
        "required": true,
        "description": "Emergency phone"
      },
      {
        "name": "employee_id",
        "type": "string",
        "required": true,
        "description": "Employee id"
      },
      {
        "name": "department_id",
        "type": "number",
        "required": true,
        "description": "Department id"
      },
      {
        "name": "designation_id",
        "type": "number",
        "required": true,
        "description": "Designation id"
      },
      {
        "name": "employment_type",
        "type": "string",
        "required": true,
        "description": "Employment type"
      },
      {
        "name": "start_date",
        "type": "string",
        "required": true,
        "description": "Start date"
      },
      {
        "name": "work_location",
        "type": "string",
        "required": true,
        "description": "Work location"
      },
      {
        "name": "base_salary",
        "type": "number",
        "required": true,
        "description": "Base salary"
      },
      {
        "name": "currency",
        "type": "string",
        "required": true,
        "description": "Currency"
      },
      {
        "name": "bank_name",
        "type": "string",
        "required": true,
        "description": "Bank name"
      },
      {
        "name": "account_holder_name",
        "type": "string",
        "required": true,
        "description": "Account holder name"
      },
      {
        "name": "account_number",
        "type": "string",
        "required": true,
        "description": "Account number"
      },
      {
        "name": "ifsc_code",
        "type": "string",
        "required": true,
        "description": "Ifsc code"
      },
      {
        "name": "branch_name",
        "type": "string",
        "required": true,
        "description": "Branch name"
      },
      {
        "name": "education",
        "type": "array",
        "required": true,
        "description": "Education"
      }
    ],
    "responses": [
      {
        "status": "201 Created",
        "code": 201,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/employees\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -d '{\n    \"email\": \"arun.patel@company.com\",\n    \"password\": \"SecurePassword123!\",\n    \"role_id\": 51,\n    \"first_name\": \"Arun\",\n    \"last_name\": \"Patel\",\n    \"date_of_birth\": \"1995-05-15\",\n    \"gender\": \"Male\",\n    \"phone\": \"+919876543210\",\n    \"secondary_email\": \"arun.personal@gmail.com\",\n    \"address\": \"Prestige Tech Park, Outer Ring Road\",\n    \"city\": \"Bengaluru\",\n    \"state\": \"Karnataka\",\n    \"zip\": \"560103\",\n    \"country\": \"India\",\n    \"emergency_contact\": \"Pooja Patel\",\n    \"emergency_relationship\": \"SPOUSE\",\n    \"emergency_phone\": \"+919876500000\",\n    \"employee_id\": \"EMP-2026-089\",\n    \"department_id\": 15,\n    \"designation_id\": 21,\n    \"employment_type\": \"Full-time\",\n    \"start_date\": \"2026-11-01\",\n    \"work_location\": \"Bengaluru Headquarters\",\n    \"base_salary\": 85000,\n    \"currency\": \"INR\",\n    \"bank_name\": \"HDFC Bank\",\n    \"account_holder_name\": \"Arun Patel\",\n    \"account_number\": \"50100234567890\",\n    \"ifsc_code\": \"HDFC0001234\",\n    \"branch_name\": \"Indiranagar, Bangalore\",\n    \"education\": [\n      {\n        \"qualification\": \"10th Grade (Secondary)\",\n        \"level\": \"SECONDARY\",\n        \"institution_name\": \"Delhi Public School\",\n        \"year_of_passing\": 2011,\n        \"score\": \"88%\"\n      },\n      {\n        \"qualification\": \"12th Grade (Senior Secondary)\",\n        \"level\": \"HIGHER_SECONDARY\",\n        \"institution_name\": \"Delhi Public School\",\n        \"year_of_passing\": 2013,\n        \"score\": \"91%\"\n      }\n    ]\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/employees\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify({\n    \"email\": \"arun.patel@company.com\",\n    \"password\": \"SecurePassword123!\",\n    \"role_id\": 51,\n    \"first_name\": \"Arun\",\n    \"last_name\": \"Patel\",\n    \"date_of_birth\": \"1995-05-15\",\n    \"gender\": \"Male\",\n    \"phone\": \"+919876543210\",\n    \"secondary_email\": \"arun.personal@gmail.com\",\n    \"address\": \"Prestige Tech Park, Outer Ring Road\",\n    \"city\": \"Bengaluru\",\n    \"state\": \"Karnataka\",\n    \"zip\": \"560103\",\n    \"country\": \"India\",\n    \"emergency_contact\": \"Pooja Patel\",\n    \"emergency_relationship\": \"SPOUSE\",\n    \"emergency_phone\": \"+919876500000\",\n    \"employee_id\": \"EMP-2026-089\",\n    \"department_id\": 15,\n    \"designation_id\": 21,\n    \"employment_type\": \"Full-time\",\n    \"start_date\": \"2026-11-01\",\n    \"work_location\": \"Bengaluru Headquarters\",\n    \"base_salary\": 85000,\n    \"currency\": \"INR\",\n    \"bank_name\": \"HDFC Bank\",\n    \"account_holder_name\": \"Arun Patel\",\n    \"account_number\": \"50100234567890\",\n    \"ifsc_code\": \"HDFC0001234\",\n    \"branch_name\": \"Indiranagar, Bangalore\",\n    \"education\": [\n      {\n        \"qualification\": \"10th Grade (Secondary)\",\n        \"level\": \"SECONDARY\",\n        \"institution_name\": \"Delhi Public School\",\n        \"year_of_passing\": 2011,\n        \"score\": \"88%\"\n      },\n      {\n        \"qualification\": \"12th Grade (Senior Secondary)\",\n        \"level\": \"HIGHER_SECONDARY\",\n        \"institution_name\": \"Delhi Public School\",\n        \"year_of_passing\": 2013,\n        \"score\": \"91%\"\n      }\n    ]\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/employees\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\"\n}\npayload = {\n  \"email\": \"arun.patel@company.com\",\n  \"password\": \"SecurePassword123!\",\n  \"role_id\": 51,\n  \"first_name\": \"Arun\",\n  \"last_name\": \"Patel\",\n  \"date_of_birth\": \"1995-05-15\",\n  \"gender\": \"Male\",\n  \"phone\": \"+919876543210\",\n  \"secondary_email\": \"arun.personal@gmail.com\",\n  \"address\": \"Prestige Tech Park, Outer Ring Road\",\n  \"city\": \"Bengaluru\",\n  \"state\": \"Karnataka\",\n  \"zip\": \"560103\",\n  \"country\": \"India\",\n  \"emergency_contact\": \"Pooja Patel\",\n  \"emergency_relationship\": \"SPOUSE\",\n  \"emergency_phone\": \"+919876500000\",\n  \"employee_id\": \"EMP-2026-089\",\n  \"department_id\": 15,\n  \"designation_id\": 21,\n  \"employment_type\": \"Full-time\",\n  \"start_date\": \"2026-11-01\",\n  \"work_location\": \"Bengaluru Headquarters\",\n  \"base_salary\": 85000,\n  \"currency\": \"INR\",\n  \"bank_name\": \"HDFC Bank\",\n  \"account_holder_name\": \"Arun Patel\",\n  \"account_number\": \"50100234567890\",\n  \"ifsc_code\": \"HDFC0001234\",\n  \"branch_name\": \"Indiranagar, Bangalore\",\n  \"education\": [\n    {\n      \"qualification\": \"10th Grade (Secondary)\",\n      \"level\": \"SECONDARY\",\n      \"institution_name\": \"Delhi Public School\",\n      \"year_of_passing\": 2011,\n      \"score\": \"88%\"\n    },\n    {\n      \"qualification\": \"12th Grade (Senior Secondary)\",\n      \"level\": \"HIGHER_SECONDARY\",\n      \"institution_name\": \"Delhi Public School\",\n      \"year_of_passing\": 2013,\n      \"score\": \"91%\"\n    }\n  ]\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/employees HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json\n\n{\n  \"email\": \"arun.patel@company.com\",\n  \"password\": \"SecurePassword123!\",\n  \"role_id\": 51,\n  \"first_name\": \"Arun\",\n  \"last_name\": \"Patel\",\n  \"date_of_birth\": \"1995-05-15\",\n  \"gender\": \"Male\",\n  \"phone\": \"+919876543210\",\n  \"secondary_email\": \"arun.personal@gmail.com\",\n  \"address\": \"Prestige Tech Park, Outer Ring Road\",\n  \"city\": \"Bengaluru\",\n  \"state\": \"Karnataka\",\n  \"zip\": \"560103\",\n  \"country\": \"India\",\n  \"emergency_contact\": \"Pooja Patel\",\n  \"emergency_relationship\": \"SPOUSE\",\n  \"emergency_phone\": \"+919876500000\",\n  \"employee_id\": \"EMP-2026-089\",\n  \"department_id\": 15,\n  \"designation_id\": 21,\n  \"employment_type\": \"Full-time\",\n  \"start_date\": \"2026-11-01\",\n  \"work_location\": \"Bengaluru Headquarters\",\n  \"base_salary\": 85000,\n  \"currency\": \"INR\",\n  \"bank_name\": \"HDFC Bank\",\n  \"account_holder_name\": \"Arun Patel\",\n  \"account_number\": \"50100234567890\",\n  \"ifsc_code\": \"HDFC0001234\",\n  \"branch_name\": \"Indiranagar, Bangalore\",\n  \"education\": [\n    {\n      \"qualification\": \"10th Grade (Secondary)\",\n      \"level\": \"SECONDARY\",\n      \"institution_name\": \"Delhi Public School\",\n      \"year_of_passing\": 2011,\n      \"score\": \"88%\"\n    },\n    {\n      \"qualification\": \"12th Grade (Senior Secondary)\",\n      \"level\": \"HIGHER_SECONDARY\",\n      \"institution_name\": \"Delhi Public School\",\n      \"year_of_passing\": 2013,\n      \"score\": \"91%\"\n    }\n  ]\n}"
    },
    "note": "role_id references a role; obtain the role ID from /api/roles. employee_id identifies an employee record; use the employee ID returned by the employee API, and confirm it is the ID type expected by this endpoint. department_id references a department; obtain the department ID from GET/POST /api/departments. designation_id references a designation; obtain the designation ID from /api/designations."
  },
  {
    "id": 22,
    "number": 22,
    "module": "Payroll",
    "moduleShortName": "Payroll",
    "moduleId": "payroll",
    "name": "List all reimbursement and payroll expense categories",
    "shortName": "List Categories",
    "description": "List all reimbursement and payroll expense categories configured for monthly submissions.",
    "method": "GET",
    "endpointUrl": "{{baseUrl}}/api/payroll/categories",
    "headers": [
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "Saved response examples:\n• List of categories (200 OK)",
    "requestBodyFields": [],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X GET \\\n  \"{{baseUrl}}/api/payroll/categories\" \\\n  -H \"Accept: application/json\" \\\n  -d 'Saved response examples:\n  • List of categories (200 OK)'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/payroll/categories\", {\n  method: \"GET\",\n  headers: {\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify(Saved response examples:\n  • List of categories (200 OK))\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/payroll/categories\"\nheaders = {\n  \"Accept\": \"application/json\"\n}\npayload = Saved response examples:\n• List of categories (200 OK)\n\nresponse = requests.get(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "GET /api/payroll/categories HTTP/1.1\nHost: api.lattiumhr.com\nAccept: application/json\n\nSaved response examples:\n• List of categories (200 OK)"
    },
    "note": null
  },
  {
    "id": 23,
    "number": 23,
    "module": "Payroll",
    "moduleShortName": "Payroll",
    "moduleId": "payroll",
    "name": "Create a reimbursement expense category",
    "shortName": "Create Category",
    "description": "Create a new reimbursement expense category with specific submission frequencies.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/payroll/categories",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "{\n  \"name\": \"Travel &amp; Conveyance\",\n  \"frequency\": \"MONTHLY\",\n  \"payDay\": \"30\",\n  \"status\": true\n}",
    "requestBodyFields": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name"
      },
      {
        "name": "frequency",
        "type": "string",
        "required": true,
        "description": "Frequency"
      },
      {
        "name": "payDay",
        "type": "string",
        "required": true,
        "description": "Pay day"
      },
      {
        "name": "status",
        "type": "boolean",
        "required": true,
        "description": "Lifecycle state flag"
      }
    ],
    "responses": [
      {
        "status": "201 Created",
        "code": 201,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/payroll/categories\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -d '{\n    \"name\": \"Travel &amp; Conveyance\",\n    \"frequency\": \"MONTHLY\",\n    \"payDay\": \"30\",\n    \"status\": true\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/payroll/categories\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify({\n    \"name\": \"Travel &amp; Conveyance\",\n    \"frequency\": \"MONTHLY\",\n    \"payDay\": \"30\",\n    \"status\": true\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/payroll/categories\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\"\n}\npayload = {\n  \"name\": \"Travel &amp; Conveyance\",\n  \"frequency\": \"MONTHLY\",\n  \"payDay\": \"30\",\n  \"status\": true\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/payroll/categories HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json\n\n{\n  \"name\": \"Travel &amp; Conveyance\",\n  \"frequency\": \"MONTHLY\",\n  \"payDay\": \"30\",\n  \"status\": true\n}"
    },
    "note": null
  },
  {
    "id": 24,
    "number": 24,
    "module": "Payroll",
    "moduleShortName": "Payroll",
    "moduleId": "payroll",
    "name": "List all salary allowance and deduction components",
    "shortName": "List Components",
    "description": "List all salary allowances, statutory contributions, and voluntary deduction components.",
    "method": "GET",
    "endpointUrl": "{{baseUrl}}/api/payroll/components",
    "headers": [
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "Saved response examples:\n• List of salary components (200 OK)",
    "requestBodyFields": [],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X GET \\\n  \"{{baseUrl}}/api/payroll/components\" \\\n  -H \"Accept: application/json\" \\\n  -d 'Saved response examples:\n  • List of salary components (200 OK)'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/payroll/components\", {\n  method: \"GET\",\n  headers: {\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify(Saved response examples:\n  • List of salary components (200 OK))\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/payroll/components\"\nheaders = {\n  \"Accept\": \"application/json\"\n}\npayload = Saved response examples:\n• List of salary components (200 OK)\n\nresponse = requests.get(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "GET /api/payroll/components HTTP/1.1\nHost: api.lattiumhr.com\nAccept: application/json\n\nSaved response examples:\n• List of salary components (200 OK)"
    },
    "note": null
  },
  {
    "id": 25,
    "number": 25,
    "module": "Payroll",
    "moduleShortName": "Payroll",
    "moduleId": "payroll",
    "name": "Create a salary component",
    "shortName": "Create Component",
    "description": "Create a new recurring or one-time salary allowance/deduction component.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/payroll/components",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "{\n  \"name\": \"Housing Rent Allowance\",\n  \"code\": \"HRA\",\n  \"type\": \"earning\",\n  \"category\": \"fixed\",\n  \"calculationType\": \"percentage\",\n  \"value\": 40,\n  \"defaultValue\": 40,\n  \"description\": \"40% of Basic Pay\",\n  \"isDefault\": true,\n  \"isTaxable\": true,\n  \"isStatutory\": false\n}",
    "requestBodyFields": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name"
      },
      {
        "name": "code",
        "type": "string",
        "required": true,
        "description": "Code"
      },
      {
        "name": "type",
        "type": "string",
        "required": true,
        "description": "Type"
      },
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Category"
      },
      {
        "name": "calculationType",
        "type": "string",
        "required": true,
        "description": "Calculation type"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Value"
      },
      {
        "name": "defaultValue",
        "type": "number",
        "required": true,
        "description": "Default value"
      },
      {
        "name": "description",
        "type": "string",
        "required": true,
        "description": "Description"
      },
      {
        "name": "isDefault",
        "type": "boolean",
        "required": true,
        "description": "Is default"
      },
      {
        "name": "isTaxable",
        "type": "boolean",
        "required": true,
        "description": "Is taxable"
      },
      {
        "name": "isStatutory",
        "type": "boolean",
        "required": true,
        "description": "Is statutory"
      }
    ],
    "responses": [
      {
        "status": "201 Created",
        "code": 201,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/payroll/components\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -d '{\n    \"name\": \"Housing Rent Allowance\",\n    \"code\": \"HRA\",\n    \"type\": \"earning\",\n    \"category\": \"fixed\",\n    \"calculationType\": \"percentage\",\n    \"value\": 40,\n    \"defaultValue\": 40,\n    \"description\": \"40% of Basic Pay\",\n    \"isDefault\": true,\n    \"isTaxable\": true,\n    \"isStatutory\": false\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/payroll/components\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify({\n    \"name\": \"Housing Rent Allowance\",\n    \"code\": \"HRA\",\n    \"type\": \"earning\",\n    \"category\": \"fixed\",\n    \"calculationType\": \"percentage\",\n    \"value\": 40,\n    \"defaultValue\": 40,\n    \"description\": \"40% of Basic Pay\",\n    \"isDefault\": true,\n    \"isTaxable\": true,\n    \"isStatutory\": false\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/payroll/components\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\"\n}\npayload = {\n  \"name\": \"Housing Rent Allowance\",\n  \"code\": \"HRA\",\n  \"type\": \"earning\",\n  \"category\": \"fixed\",\n  \"calculationType\": \"percentage\",\n  \"value\": 40,\n  \"defaultValue\": 40,\n  \"description\": \"40% of Basic Pay\",\n  \"isDefault\": true,\n  \"isTaxable\": true,\n  \"isStatutory\": false\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/payroll/components HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json\n\n{\n  \"name\": \"Housing Rent Allowance\",\n  \"code\": \"HRA\",\n  \"type\": \"earning\",\n  \"category\": \"fixed\",\n  \"calculationType\": \"percentage\",\n  \"value\": 40,\n  \"defaultValue\": 40,\n  \"description\": \"40% of Basic Pay\",\n  \"isDefault\": true,\n  \"isTaxable\": true,\n  \"isStatutory\": false\n}"
    },
    "note": null
  },
  {
    "id": 26,
    "number": 26,
    "module": "Payroll",
    "moduleShortName": "Payroll",
    "moduleId": "payroll",
    "name": "List salary structures",
    "shortName": "List Structures",
    "description": "List salary structures and pay bands defined across legal entities.",
    "method": "GET",
    "endpointUrl": "{{baseUrl}}/api/payroll/structures",
    "headers": [
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "Saved response examples:\n• List of structures (200 OK)",
    "requestBodyFields": [],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X GET \\\n  \"{{baseUrl}}/api/payroll/structures\" \\\n  -H \"Accept: application/json\" \\\n  -d 'Saved response examples:\n  • List of structures (200 OK)'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/payroll/structures\", {\n  method: \"GET\",\n  headers: {\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify(Saved response examples:\n  • List of structures (200 OK))\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/payroll/structures\"\nheaders = {\n  \"Accept\": \"application/json\"\n}\npayload = Saved response examples:\n• List of structures (200 OK)\n\nresponse = requests.get(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "GET /api/payroll/structures HTTP/1.1\nHost: api.lattiumhr.com\nAccept: application/json\n\nSaved response examples:\n• List of structures (200 OK)"
    },
    "note": null
  },
  {
    "id": 27,
    "number": 27,
    "module": "Payroll",
    "moduleShortName": "Payroll",
    "moduleId": "payroll",
    "name": "Create a salary structure for an employee or band",
    "shortName": "Create Structure",
    "description": "Create a custom salary structure assignment for an employee or designated job band.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/payroll/structures",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "{\n  \"name\": \"Senior Software Engineer - Band L4\",\n  \"grade\": \"L4\",\n  \"ctc\": 1800000,\n  \"level\": \"employee\",\n  \"employeeId\": 145,\n  \"components\": [\n    {\n      \"componentId\": 1,\n      \"amount\": 60000\n    },\n    {\n      \"componentId\": 42,\n      \"amount\": 24000\n    },\n    {\n      \"componentId\": 3,\n      \"amount\": 7200\n    }\n  ],\n  \"description\": \"Annual CTC package for Arun Patel\"\n}",
    "requestBodyFields": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name"
      },
      {
        "name": "grade",
        "type": "string",
        "required": true,
        "description": "Grade"
      },
      {
        "name": "ctc",
        "type": "number",
        "required": true,
        "description": "Ctc"
      },
      {
        "name": "level",
        "type": "string",
        "required": true,
        "description": "Level"
      },
      {
        "name": "employeeId",
        "type": "number",
        "required": true,
        "description": "Unique foreign-key identifier for employee"
      },
      {
        "name": "components",
        "type": "array",
        "required": true,
        "description": "Components"
      },
      {
        "name": "description",
        "type": "string",
        "required": true,
        "description": "Description"
      }
    ],
    "responses": [
      {
        "status": "201 Created",
        "code": 201,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/payroll/structures\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -d '{\n    \"name\": \"Senior Software Engineer - Band L4\",\n    \"grade\": \"L4\",\n    \"ctc\": 1800000,\n    \"level\": \"employee\",\n    \"employeeId\": 145,\n    \"components\": [\n      {\n        \"componentId\": 1,\n        \"amount\": 60000\n      },\n      {\n        \"componentId\": 42,\n        \"amount\": 24000\n      },\n      {\n        \"componentId\": 3,\n        \"amount\": 7200\n      }\n    ],\n    \"description\": \"Annual CTC package for Arun Patel\"\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/payroll/structures\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify({\n    \"name\": \"Senior Software Engineer - Band L4\",\n    \"grade\": \"L4\",\n    \"ctc\": 1800000,\n    \"level\": \"employee\",\n    \"employeeId\": 145,\n    \"components\": [\n      {\n        \"componentId\": 1,\n        \"amount\": 60000\n      },\n      {\n        \"componentId\": 42,\n        \"amount\": 24000\n      },\n      {\n        \"componentId\": 3,\n        \"amount\": 7200\n      }\n    ],\n    \"description\": \"Annual CTC package for Arun Patel\"\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/payroll/structures\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\"\n}\npayload = {\n  \"name\": \"Senior Software Engineer - Band L4\",\n  \"grade\": \"L4\",\n  \"ctc\": 1800000,\n  \"level\": \"employee\",\n  \"employeeId\": 145,\n  \"components\": [\n    {\n      \"componentId\": 1,\n      \"amount\": 60000\n    },\n    {\n      \"componentId\": 42,\n      \"amount\": 24000\n    },\n    {\n      \"componentId\": 3,\n      \"amount\": 7200\n    }\n  ],\n  \"description\": \"Annual CTC package for Arun Patel\"\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/payroll/structures HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json\n\n{\n  \"name\": \"Senior Software Engineer - Band L4\",\n  \"grade\": \"L4\",\n  \"ctc\": 1800000,\n  \"level\": \"employee\",\n  \"employeeId\": 145,\n  \"components\": [\n    {\n      \"componentId\": 1,\n      \"amount\": 60000\n    },\n    {\n      \"componentId\": 42,\n      \"amount\": 24000\n    },\n    {\n      \"componentId\": 3,\n      \"amount\": 7200\n    }\n  ],\n  \"description\": \"Annual CTC package for Arun Patel\"\n}"
    },
    "note": "employeeId identifies an employee record; use the employee ID returned by the employee API, and confirm it is the ID type expected by this endpoint."
  },
  {
    "id": 32,
    "number": 32,
    "module": "Payroll",
    "moduleShortName": "Payroll",
    "moduleId": "payroll",
    "name": "Trigger payroll calculation batch run",
    "shortName": "Calculate Payroll",
    "description": "Trigger a batch payroll calculation run for eligible employees across the active pay period.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/payroll/calculate",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "{\n  \"employeeId\": 210,\n  \"month\": 10,\n  \"year\": 2026,\n  \"workingDays\": 26,\n  \"lopDays\": 0,\n  \"overtimeHours\": 0,\n  \"arrearsAmount\": 0,\n  \"bonusAmount\": 0\n}",
    "requestBodyFields": [
      {
        "name": "employeeId",
        "type": "number",
        "required": true,
        "description": "Unique foreign-key identifier for employee"
      },
      {
        "name": "month",
        "type": "number",
        "required": true,
        "description": "Month"
      },
      {
        "name": "year",
        "type": "number",
        "required": true,
        "description": "Year"
      },
      {
        "name": "workingDays",
        "type": "number",
        "required": true,
        "description": "Working days"
      },
      {
        "name": "lopDays",
        "type": "number",
        "required": true,
        "description": "Lop days"
      },
      {
        "name": "overtimeHours",
        "type": "number",
        "required": true,
        "description": "Overtime hours"
      },
      {
        "name": "arrearsAmount",
        "type": "number",
        "required": true,
        "description": "Arrears amount"
      },
      {
        "name": "bonusAmount",
        "type": "number",
        "required": true,
        "description": "Bonus amount"
      }
    ],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/payroll/calculate\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -d '{\n    \"employeeId\": 210,\n    \"month\": 10,\n    \"year\": 2026,\n    \"workingDays\": 26,\n    \"lopDays\": 0,\n    \"overtimeHours\": 0,\n    \"arrearsAmount\": 0,\n    \"bonusAmount\": 0\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/payroll/calculate\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify({\n    \"employeeId\": 210,\n    \"month\": 10,\n    \"year\": 2026,\n    \"workingDays\": 26,\n    \"lopDays\": 0,\n    \"overtimeHours\": 0,\n    \"arrearsAmount\": 0,\n    \"bonusAmount\": 0\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/payroll/calculate\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\"\n}\npayload = {\n  \"employeeId\": 210,\n  \"month\": 10,\n  \"year\": 2026,\n  \"workingDays\": 26,\n  \"lopDays\": 0,\n  \"overtimeHours\": 0,\n  \"arrearsAmount\": 0,\n  \"bonusAmount\": 0\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/payroll/calculate HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json\n\n{\n  \"employeeId\": 210,\n  \"month\": 10,\n  \"year\": 2026,\n  \"workingDays\": 26,\n  \"lopDays\": 0,\n  \"overtimeHours\": 0,\n  \"arrearsAmount\": 0,\n  \"bonusAmount\": 0\n}"
    },
    "note": "employeeId identifies an employee record; use the employee ID returned by the employee API, and confirm it is the ID type expected by this endpoint."
  },
  {
    "id": 34,
    "number": 34,
    "module": "Asset Management",
    "moduleShortName": "Assets",
    "moduleId": "asset-management",
    "name": "List asset categories",
    "shortName": "List Categories",
    "description": "List all registered physical asset categories, models, and depreciation schedules.",
    "method": "GET",
    "endpointUrl": "{{baseUrl}}/api/assets/categories",
    "headers": [
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "Saved response examples:\n• List of asset categories (200 OK)",
    "requestBodyFields": [],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X GET \\\n  \"{{baseUrl}}/api/assets/categories\" \\\n  -H \"Accept: application/json\" \\\n  -d 'Saved response examples:\n  • List of asset categories (200 OK)'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/assets/categories\", {\n  method: \"GET\",\n  headers: {\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify(Saved response examples:\n  • List of asset categories (200 OK))\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/assets/categories\"\nheaders = {\n  \"Accept\": \"application/json\"\n}\npayload = Saved response examples:\n• List of asset categories (200 OK)\n\nresponse = requests.get(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "GET /api/assets/categories HTTP/1.1\nHost: api.lattiumhr.com\nAccept: application/json\n\nSaved response examples:\n• List of asset categories (200 OK)"
    },
    "note": null
  },
  {
    "id": 35,
    "number": 35,
    "module": "Asset Management",
    "moduleShortName": "Assets",
    "moduleId": "asset-management",
    "name": "Create an asset category",
    "shortName": "Create Category",
    "description": "Create a new asset category for classifying hardware, peripherals, or workspace equipment.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/assets/categories",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "{\n  \"name\": \"Computing Devices\",\n  \"description\": \"Laptops, Desktops, and Workstations\",\n  \"depreciationRate\": 25\n}",
    "requestBodyFields": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name"
      },
      {
        "name": "description",
        "type": "string",
        "required": true,
        "description": "Description"
      },
      {
        "name": "depreciationRate",
        "type": "number",
        "required": true,
        "description": "Depreciation rate"
      }
    ],
    "responses": [
      {
        "status": "201 Created",
        "code": 201,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/assets/categories\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -d '{\n    \"name\": \"Computing Devices\",\n    \"description\": \"Laptops, Desktops, and Workstations\",\n    \"depreciationRate\": 25\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/assets/categories\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify({\n    \"name\": \"Computing Devices\",\n    \"description\": \"Laptops, Desktops, and Workstations\",\n    \"depreciationRate\": 25\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/assets/categories\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\"\n}\npayload = {\n  \"name\": \"Computing Devices\",\n  \"description\": \"Laptops, Desktops, and Workstations\",\n  \"depreciationRate\": 25\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/assets/categories HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json\n\n{\n  \"name\": \"Computing Devices\",\n  \"description\": \"Laptops, Desktops, and Workstations\",\n  \"depreciationRate\": 25\n}"
    },
    "note": null
  },
  {
    "id": 36,
    "number": 36,
    "module": "Asset Management",
    "moduleShortName": "Assets",
    "moduleId": "asset-management",
    "name": "List asset types / models",
    "shortName": "List Types",
    "description": "List all registered asset types and hardware models under an asset category.",
    "method": "GET",
    "endpointUrl": "{{baseUrl}}/api/assets/types",
    "headers": [
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "Saved response examples:\n• List of asset types (200 OK)",
    "requestBodyFields": [],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X GET \\\n  \"{{baseUrl}}/api/assets/types\" \\\n  -H \"Accept: application/json\" \\\n  -d 'Saved response examples:\n  • List of asset types (200 OK)'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/assets/types\", {\n  method: \"GET\",\n  headers: {\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify(Saved response examples:\n  • List of asset types (200 OK))\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/assets/types\"\nheaders = {\n  \"Accept\": \"application/json\"\n}\npayload = Saved response examples:\n• List of asset types (200 OK)\n\nresponse = requests.get(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "GET /api/assets/types HTTP/1.1\nHost: api.lattiumhr.com\nAccept: application/json\n\nSaved response examples:\n• List of asset types (200 OK)"
    },
    "note": null
  },
  {
    "id": 37,
    "number": 37,
    "module": "Asset Management",
    "moduleShortName": "Assets",
    "moduleId": "asset-management",
    "name": "Create an asset type",
    "shortName": "Create Type",
    "description": "Register a new asset model under an existing asset category.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/assets/types",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "{\n  \"categoryId\": 34,\n  \"name\": \"Engineering Laptop\",\n  \"model\": \"ThinkPad P1 Gen 6\",\n  \"manufacturer\": \"Lenovo\"\n}",
    "requestBodyFields": [
      {
        "name": "categoryId",
        "type": "number",
        "required": true,
        "description": "Unique foreign-key identifier for category"
      },
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name"
      },
      {
        "name": "model",
        "type": "string",
        "required": true,
        "description": "Model"
      },
      {
        "name": "manufacturer",
        "type": "string",
        "required": true,
        "description": "Manufacturer"
      }
    ],
    "responses": [
      {
        "status": "201 Created",
        "code": 201,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/assets/types\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -d '{\n    \"categoryId\": 34,\n    \"name\": \"Engineering Laptop\",\n    \"model\": \"ThinkPad P1 Gen 6\",\n    \"manufacturer\": \"Lenovo\"\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/assets/types\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify({\n    \"categoryId\": 34,\n    \"name\": \"Engineering Laptop\",\n    \"model\": \"ThinkPad P1 Gen 6\",\n    \"manufacturer\": \"Lenovo\"\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/assets/types\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\"\n}\npayload = {\n  \"categoryId\": 34,\n  \"name\": \"Engineering Laptop\",\n  \"model\": \"ThinkPad P1 Gen 6\",\n  \"manufacturer\": \"Lenovo\"\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/assets/types HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json\n\n{\n  \"categoryId\": 34,\n  \"name\": \"Engineering Laptop\",\n  \"model\": \"ThinkPad P1 Gen 6\",\n  \"manufacturer\": \"Lenovo\"\n}"
    },
    "note": "categoryId references a category; use the category ID returned by the corresponding category endpoint."
  },
  {
    "id": 38,
    "number": 38,
    "module": "Asset Management",
    "moduleShortName": "Assets",
    "moduleId": "asset-management",
    "name": "List physical asset locations",
    "shortName": "List Locations",
    "description": "List physical corporate facilities, branches, and storage locations.",
    "method": "GET",
    "endpointUrl": "{{baseUrl}}/api/assets/locations",
    "headers": [
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "Saved response examples:\n• List of locations (200 OK)",
    "requestBodyFields": [],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X GET \\\n  \"{{baseUrl}}/api/assets/locations\" \\\n  -H \"Accept: application/json\" \\\n  -d 'Saved response examples:\n  • List of locations (200 OK)'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/assets/locations\", {\n  method: \"GET\",\n  headers: {\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify(Saved response examples:\n  • List of locations (200 OK))\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/assets/locations\"\nheaders = {\n  \"Accept\": \"application/json\"\n}\npayload = Saved response examples:\n• List of locations (200 OK)\n\nresponse = requests.get(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "GET /api/assets/locations HTTP/1.1\nHost: api.lattiumhr.com\nAccept: application/json\n\nSaved response examples:\n• List of locations (200 OK)"
    },
    "note": null
  },
  {
    "id": 39,
    "number": 39,
    "module": "Asset Management",
    "moduleShortName": "Assets",
    "moduleId": "asset-management",
    "name": "Create an asset location",
    "shortName": "Create Location",
    "description": "Create a new physical asset storage location or facility code.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/assets/locations",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "{\n  \"name\": \"Headquarters\",\n  \"address\": \"Outer Ring Road, Bellandur\",\n  \"city\": \"Bengaluru\",\n  \"country\": \"India\"\n}",
    "requestBodyFields": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name"
      },
      {
        "name": "address",
        "type": "string",
        "required": true,
        "description": "Address"
      },
      {
        "name": "city",
        "type": "string",
        "required": true,
        "description": "City"
      },
      {
        "name": "country",
        "type": "string",
        "required": true,
        "description": "Country"
      }
    ],
    "responses": [
      {
        "status": "201 Created",
        "code": 201,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/assets/locations\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -d '{\n    \"name\": \"Headquarters\",\n    \"address\": \"Outer Ring Road, Bellandur\",\n    \"city\": \"Bengaluru\",\n    \"country\": \"India\"\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/assets/locations\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify({\n    \"name\": \"Headquarters\",\n    \"address\": \"Outer Ring Road, Bellandur\",\n    \"city\": \"Bengaluru\",\n    \"country\": \"India\"\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/assets/locations\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\"\n}\npayload = {\n  \"name\": \"Headquarters\",\n  \"address\": \"Outer Ring Road, Bellandur\",\n  \"city\": \"Bengaluru\",\n  \"country\": \"India\"\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/assets/locations HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json\n\n{\n  \"name\": \"Headquarters\",\n  \"address\": \"Outer Ring Road, Bellandur\",\n  \"city\": \"Bengaluru\",\n  \"country\": \"India\"\n}"
    },
    "note": null
  },
  {
    "id": 41,
    "number": 41,
    "module": "Asset Management",
    "moduleShortName": "Assets",
    "moduleId": "asset-management",
    "name": "List employee asset requests",
    "shortName": "List Requests",
    "description": "List pending and fulfilled asset requests submitted by employees.",
    "method": "GET",
    "endpointUrl": "{{baseUrl}}/api/assets/requests",
    "headers": [
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "Saved response examples:\n• List of asset requests (200 OK)",
    "requestBodyFields": [],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X GET \\\n  \"{{baseUrl}}/api/assets/requests\" \\\n  -H \"Accept: application/json\" \\\n  -d 'Saved response examples:\n  • List of asset requests (200 OK)'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/assets/requests\", {\n  method: \"GET\",\n  headers: {\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify(Saved response examples:\n  • List of asset requests (200 OK))\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/assets/requests\"\nheaders = {\n  \"Accept\": \"application/json\"\n}\npayload = Saved response examples:\n• List of asset requests (200 OK)\n\nresponse = requests.get(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "GET /api/assets/requests HTTP/1.1\nHost: api.lattiumhr.com\nAccept: application/json\n\nSaved response examples:\n• List of asset requests (200 OK)"
    },
    "note": null
  },
  {
    "id": 42,
    "number": 42,
    "module": "Asset Management",
    "moduleShortName": "Assets",
    "moduleId": "asset-management",
    "name": "Submit request for an asset",
    "shortName": "Submit Request",
    "description": "Submit a requisition for an asset or workstation hardware required for job execution.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/assets/requests",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "{\n  \"employeeId\": 210,\n  \"assetId\": 28,\n  \"reason\": \"Engineering workstation for distributed microservices development\"\n}",
    "requestBodyFields": [
      {
        "name": "employeeId",
        "type": "number",
        "required": true,
        "description": "Unique foreign-key identifier for employee"
      },
      {
        "name": "assetId",
        "type": "number",
        "required": true,
        "description": "Unique foreign-key identifier for asset"
      },
      {
        "name": "reason",
        "type": "string",
        "required": true,
        "description": "Business justification or primary reason"
      }
    ],
    "responses": [
      {
        "status": "201 Created",
        "code": 201,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/assets/requests\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -d '{\n    \"employeeId\": 210,\n    \"assetId\": 28,\n    \"reason\": \"Engineering workstation for distributed microservices development\"\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/assets/requests\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify({\n    \"employeeId\": 210,\n    \"assetId\": 28,\n    \"reason\": \"Engineering workstation for distributed microservices development\"\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/assets/requests\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\"\n}\npayload = {\n  \"employeeId\": 210,\n  \"assetId\": 28,\n  \"reason\": \"Engineering workstation for distributed microservices development\"\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/assets/requests HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json\n\n{\n  \"employeeId\": 210,\n  \"assetId\": 28,\n  \"reason\": \"Engineering workstation for distributed microservices development\"\n}"
    },
    "note": "employeeId identifies an employee record; use the employee ID returned by the employee API, and confirm it is the ID type expected by this endpoint. assetId references an asset; obtain it from the asset list/create response."
  },
  {
    "id": 45,
    "number": 45,
    "module": "Survey",
    "moduleShortName": "Survey",
    "moduleId": "survey",
    "name": "Append a question to an existing survey",
    "shortName": "Add Question",
    "description": "Append a question to an active or draft pulse survey campaign.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/survey/:surveyId/questions",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json",
      "Authorization: Bearer {{bearerToken}}"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      },
      {
        "key": "Authorization",
        "value": "Bearer {{bearerToken}}"
      }
    ],
    "parameters": [
      {
        "name": "surveyId",
        "in": "path",
        "type": "string | number",
        "required": true,
        "description": "surveyId (example: 07d57bca-3754-4ac6-940e-b8278355cebf)"
      }
    ],
    "requestBody": "{\n  \"label\": \"Would you recommend the company engineering culture to peers?\",\n  \"type\": \"MULTIPLE_CHOICE\",\n  \"order\": 1,\n  \"required\": true,\n  \"options\": [\n    {\n      \"label\": \"Yes, highly recommend\",\n      \"value\": \"YES\",\n      \"order\": 1\n    },\n    {\n      \"label\": \"Neutral\",\n      \"value\": \"NEUTRAL\",\n      \"order\": 2\n    },\n    {\n      \"label\": \"Unlikely\",\n      \"value\": \"UNLIKELY\",\n      \"order\": 3\n    }\n  ]\n}",
    "requestBodyFields": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Label"
      },
      {
        "name": "type",
        "type": "string",
        "required": true,
        "description": "Type"
      },
      {
        "name": "order",
        "type": "number",
        "required": true,
        "description": "Order"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": true,
        "description": "Required"
      },
      {
        "name": "options",
        "type": "array",
        "required": true,
        "description": "Options"
      }
    ],
    "responses": [
      {
        "status": "201 Created",
        "code": 201,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/survey/:surveyId/questions\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer {{bearerToken}}\" \\\n  -d '{\n    \"label\": \"Would you recommend the company engineering culture to peers?\",\n    \"type\": \"MULTIPLE_CHOICE\",\n    \"order\": 1,\n    \"required\": true,\n    \"options\": [\n      {\n        \"label\": \"Yes, highly recommend\",\n        \"value\": \"YES\",\n        \"order\": 1\n      },\n      {\n        \"label\": \"Neutral\",\n        \"value\": \"NEUTRAL\",\n        \"order\": 2\n      },\n      {\n        \"label\": \"Unlikely\",\n        \"value\": \"UNLIKELY\",\n        \"order\": 3\n      }\n    ]\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/survey/:surveyId/questions\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\",\n    \"Authorization\": \"Bearer {{bearerToken}}\"\n  },\n  body: JSON.stringify({\n    \"label\": \"Would you recommend the company engineering culture to peers?\",\n    \"type\": \"MULTIPLE_CHOICE\",\n    \"order\": 1,\n    \"required\": true,\n    \"options\": [\n      {\n        \"label\": \"Yes, highly recommend\",\n        \"value\": \"YES\",\n        \"order\": 1\n      },\n      {\n        \"label\": \"Neutral\",\n        \"value\": \"NEUTRAL\",\n        \"order\": 2\n      },\n      {\n        \"label\": \"Unlikely\",\n        \"value\": \"UNLIKELY\",\n        \"order\": 3\n      }\n    ]\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/survey/:surveyId/questions\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\",\n  \"Authorization\": \"Bearer {{bearerToken}}\"\n}\npayload = {\n  \"label\": \"Would you recommend the company engineering culture to peers?\",\n  \"type\": \"MULTIPLE_CHOICE\",\n  \"order\": 1,\n  \"required\": true,\n  \"options\": [\n    {\n      \"label\": \"Yes, highly recommend\",\n      \"value\": \"YES\",\n      \"order\": 1\n    },\n    {\n      \"label\": \"Neutral\",\n      \"value\": \"NEUTRAL\",\n      \"order\": 2\n    },\n    {\n      \"label\": \"Unlikely\",\n      \"value\": \"UNLIKELY\",\n      \"order\": 3\n    }\n  ]\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/survey/:surveyId/questions HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json\nAuthorization: Bearer {{bearerToken}}\n\n{\n  \"label\": \"Would you recommend the company engineering culture to peers?\",\n  \"type\": \"MULTIPLE_CHOICE\",\n  \"order\": 1,\n  \"required\": true,\n  \"options\": [\n    {\n      \"label\": \"Yes, highly recommend\",\n      \"value\": \"YES\",\n      \"order\": 1\n    },\n    {\n      \"label\": \"Neutral\",\n      \"value\": \"NEUTRAL\",\n      \"order\": 2\n    },\n    {\n      \"label\": \"Unlikely\",\n      \"value\": \"UNLIKELY\",\n      \"order\": 3\n    }\n  ]\n}"
    },
    "note": null
  },
  {
    "id": 46,
    "number": 46,
    "module": "Survey",
    "moduleShortName": "Survey",
    "moduleId": "survey",
    "name": "Get aggregated analytics and distribution for a survey",
    "shortName": "Survey Analytics",
    "description": "Get aggregated response metrics, participation rates, and answer distributions for a survey.",
    "method": "GET",
    "endpointUrl": "{{baseUrl}}/api/survey/:surveyId/responses",
    "headers": [
      "Accept: application/json",
      "Authorization: Bearer {{bearerToken}}"
    ],
    "headersTable": [
      {
        "key": "Accept",
        "value": "application/json"
      },
      {
        "key": "Authorization",
        "value": "Bearer {{bearerToken}}"
      }
    ],
    "parameters": [
      {
        "name": "surveyId",
        "in": "path",
        "type": "string | number",
        "required": true,
        "description": "surveyId (example: 07d57bca-3754-4ac6-940e-b8278355cebf)"
      }
    ],
    "requestBody": "Path variables: surveyId (example: 07d57bca-3754-4ac6-940e-b8278355cebf)\nSaved response examples:\n• Aggregated response metrics (200 OK)",
    "requestBodyFields": [],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X GET \\\n  \"{{baseUrl}}/api/survey/:surveyId/responses\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer {{bearerToken}}\" \\\n  -d 'Path variables: surveyId (example: 07d57bca-3754-4ac6-940e-b8278355cebf)\n  Saved response examples:\n  • Aggregated response metrics (200 OK)'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/survey/:surveyId/responses\", {\n  method: \"GET\",\n  headers: {\n    \"Accept\": \"application/json\",\n    \"Authorization\": \"Bearer {{bearerToken}}\"\n  },\n  body: JSON.stringify(Path variables: surveyId (example: 07d57bca-3754-4ac6-940e-b8278355cebf)\n  Saved response examples:\n  • Aggregated response metrics (200 OK))\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/survey/:surveyId/responses\"\nheaders = {\n  \"Accept\": \"application/json\",\n  \"Authorization\": \"Bearer {{bearerToken}}\"\n}\npayload = Path variables: surveyId (example: 07d57bca-3754-4ac6-940e-b8278355cebf)\nSaved response examples:\n• Aggregated response metrics (200 OK)\n\nresponse = requests.get(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "GET /api/survey/:surveyId/responses HTTP/1.1\nHost: api.lattiumhr.com\nAccept: application/json\nAuthorization: Bearer {{bearerToken}}\n\nPath variables: surveyId (example: 07d57bca-3754-4ac6-940e-b8278355cebf)\nSaved response examples:\n• Aggregated response metrics (200 OK)"
    },
    "note": null
  },
  {
    "id": 47,
    "number": 47,
    "module": "Survey",
    "moduleShortName": "Survey",
    "moduleId": "survey",
    "name": "Submit response to an authenticated internal survey",
    "shortName": "Submit Response",
    "description": "Submit authenticated employee feedback responses to an active pulse survey campaign.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/survey/responses",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json",
      "Authorization: Bearer {{bearerToken}}"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      },
      {
        "key": "Authorization",
        "value": "Bearer {{bearerToken}}"
      }
    ],
    "parameters": [],
    "requestBody": "{\n  \"surveyId\": \"07d57bca-3754-4ac6-940e-b8278355cebf\",\n  \"answers\": [\n    {\n      \"questionId\": 60,\n      \"answer\": \"Detailed microservices architecture blueprints\"\n    }\n  ]\n}",
    "requestBodyFields": [
      {
        "name": "surveyId",
        "type": "string",
        "required": true,
        "description": "Unique foreign-key identifier for survey"
      },
      {
        "name": "answers",
        "type": "array",
        "required": true,
        "description": "Answers"
      }
    ],
    "responses": [
      {
        "status": "201 Created",
        "code": 201,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/survey/responses\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer {{bearerToken}}\" \\\n  -d '{\n    \"surveyId\": \"07d57bca-3754-4ac6-940e-b8278355cebf\",\n    \"answers\": [\n      {\n        \"questionId\": 60,\n        \"answer\": \"Detailed microservices architecture blueprints\"\n      }\n    ]\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/survey/responses\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\",\n    \"Authorization\": \"Bearer {{bearerToken}}\"\n  },\n  body: JSON.stringify({\n    \"surveyId\": \"07d57bca-3754-4ac6-940e-b8278355cebf\",\n    \"answers\": [\n      {\n        \"questionId\": 60,\n        \"answer\": \"Detailed microservices architecture blueprints\"\n      }\n    ]\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/survey/responses\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\",\n  \"Authorization\": \"Bearer {{bearerToken}}\"\n}\npayload = {\n  \"surveyId\": \"07d57bca-3754-4ac6-940e-b8278355cebf\",\n  \"answers\": [\n    {\n      \"questionId\": 60,\n      \"answer\": \"Detailed microservices architecture blueprints\"\n    }\n  ]\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/survey/responses HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json\nAuthorization: Bearer {{bearerToken}}\n\n{\n  \"surveyId\": \"07d57bca-3754-4ac6-940e-b8278355cebf\",\n  \"answers\": [\n    {\n      \"questionId\": 60,\n      \"answer\": \"Detailed microservices architecture blueprints\"\n    }\n  ]\n}"
    },
    "note": "surveyId references a survey; use the survey ID returned by the survey endpoint."
  },
  {
    "id": 50,
    "number": 50,
    "module": "Survey",
    "moduleShortName": "Survey",
    "moduleId": "survey",
    "name": "List all active and archived surveys",
    "shortName": "List Surveys",
    "description": "List all active, scheduled, and archived employee engagement surveys.",
    "method": "GET",
    "endpointUrl": "{{baseUrl}}/api/survey",
    "headers": [
      "Accept: application/json",
      "Authorization: Bearer {{bearerToken}}"
    ],
    "headersTable": [
      {
        "key": "Accept",
        "value": "application/json"
      },
      {
        "key": "Authorization",
        "value": "Bearer {{bearerToken}}"
      }
    ],
    "parameters": [],
    "requestBody": "Saved response examples:\n• List of surveys (200 OK)",
    "requestBodyFields": [],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X GET \\\n  \"{{baseUrl}}/api/survey\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer {{bearerToken}}\" \\\n  -d 'Saved response examples:\n  • List of surveys (200 OK)'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/survey\", {\n  method: \"GET\",\n  headers: {\n    \"Accept\": \"application/json\",\n    \"Authorization\": \"Bearer {{bearerToken}}\"\n  },\n  body: JSON.stringify(Saved response examples:\n  • List of surveys (200 OK))\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/survey\"\nheaders = {\n  \"Accept\": \"application/json\",\n  \"Authorization\": \"Bearer {{bearerToken}}\"\n}\npayload = Saved response examples:\n• List of surveys (200 OK)\n\nresponse = requests.get(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "GET /api/survey HTTP/1.1\nHost: api.lattiumhr.com\nAccept: application/json\nAuthorization: Bearer {{bearerToken}}\n\nSaved response examples:\n• List of surveys (200 OK)"
    },
    "note": null
  },
  {
    "id": 51,
    "number": 51,
    "module": "Survey",
    "moduleShortName": "Survey",
    "moduleId": "survey",
    "name": "Create a new survey campaign with questions",
    "shortName": "Create Survey",
    "description": "Create a new pulse survey campaign complete with scheduling window and questions.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/survey",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json",
      "Authorization: Bearer {{bearerToken}}"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      },
      {
        "key": "Authorization",
        "value": "Bearer {{bearerToken}}"
      }
    ],
    "parameters": [],
    "requestBody": "{\n  \"title\": \"Engineering Pulse 2026\",\n  \"description\": \"Quarterly engineering survey on architecture and tools\",\n  \"status\": \"Active\",\n  \"start_date\": \"2026-11-01T00:00:00.000Z\",\n  \"end_date\": \"2026-12-31T00:00:00.000Z\",\n  \"questions\": [\n    {\n      \"label\": \"How satisfied are you with technical toolchains\",\n      \"type\": \"RATING\",\n      \"order\": 1,\n      \"required\": true\n    },\n    {\n      \"label\": \"Do you have any suggestions to improve deployment efficiency\",\n      \"type\": \"TEXT\",\n      \"order\": 2,\n      \"required\": false\n    }\n  ]\n}",
    "requestBodyFields": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Name or title identifier"
      },
      {
        "name": "description",
        "type": "string",
        "required": true,
        "description": "Description"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "description": "Lifecycle state flag"
      },
      {
        "name": "start_date",
        "type": "string",
        "required": true,
        "description": "Start date"
      },
      {
        "name": "end_date",
        "type": "string",
        "required": true,
        "description": "End date"
      },
      {
        "name": "questions",
        "type": "array",
        "required": true,
        "description": "Questions"
      }
    ],
    "responses": [
      {
        "status": "201 Created",
        "code": 201,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/survey\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer {{bearerToken}}\" \\\n  -d '{\n    \"title\": \"Engineering Pulse 2026\",\n    \"description\": \"Quarterly engineering survey on architecture and tools\",\n    \"status\": \"Active\",\n    \"start_date\": \"2026-11-01T00:00:00.000Z\",\n    \"end_date\": \"2026-12-31T00:00:00.000Z\",\n    \"questions\": [\n      {\n        \"label\": \"How satisfied are you with technical toolchains\",\n        \"type\": \"RATING\",\n        \"order\": 1,\n        \"required\": true\n      },\n      {\n        \"label\": \"Do you have any suggestions to improve deployment efficiency\",\n        \"type\": \"TEXT\",\n        \"order\": 2,\n        \"required\": false\n      }\n    ]\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/survey\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\",\n    \"Authorization\": \"Bearer {{bearerToken}}\"\n  },\n  body: JSON.stringify({\n    \"title\": \"Engineering Pulse 2026\",\n    \"description\": \"Quarterly engineering survey on architecture and tools\",\n    \"status\": \"Active\",\n    \"start_date\": \"2026-11-01T00:00:00.000Z\",\n    \"end_date\": \"2026-12-31T00:00:00.000Z\",\n    \"questions\": [\n      {\n        \"label\": \"How satisfied are you with technical toolchains\",\n        \"type\": \"RATING\",\n        \"order\": 1,\n        \"required\": true\n      },\n      {\n        \"label\": \"Do you have any suggestions to improve deployment efficiency\",\n        \"type\": \"TEXT\",\n        \"order\": 2,\n        \"required\": false\n      }\n    ]\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/survey\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\",\n  \"Authorization\": \"Bearer {{bearerToken}}\"\n}\npayload = {\n  \"title\": \"Engineering Pulse 2026\",\n  \"description\": \"Quarterly engineering survey on architecture and tools\",\n  \"status\": \"Active\",\n  \"start_date\": \"2026-11-01T00:00:00.000Z\",\n  \"end_date\": \"2026-12-31T00:00:00.000Z\",\n  \"questions\": [\n    {\n      \"label\": \"How satisfied are you with technical toolchains\",\n      \"type\": \"RATING\",\n      \"order\": 1,\n      \"required\": true\n    },\n    {\n      \"label\": \"Do you have any suggestions to improve deployment efficiency\",\n      \"type\": \"TEXT\",\n      \"order\": 2,\n      \"required\": false\n    }\n  ]\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/survey HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json\nAuthorization: Bearer {{bearerToken}}\n\n{\n  \"title\": \"Engineering Pulse 2026\",\n  \"description\": \"Quarterly engineering survey on architecture and tools\",\n  \"status\": \"Active\",\n  \"start_date\": \"2026-11-01T00:00:00.000Z\",\n  \"end_date\": \"2026-12-31T00:00:00.000Z\",\n  \"questions\": [\n    {\n      \"label\": \"How satisfied are you with technical toolchains\",\n      \"type\": \"RATING\",\n      \"order\": 1,\n      \"required\": true\n    },\n    {\n      \"label\": \"Do you have any suggestions to improve deployment efficiency\",\n      \"type\": \"TEXT\",\n      \"order\": 2,\n      \"required\": false\n    }\n  ]\n}"
    },
    "note": null
  },
  {
    "id": 52,
    "number": 52,
    "module": "Employee Offboarding",
    "moduleShortName": "Offboarding",
    "moduleId": "employee-offboarding",
    "name": "Submit a resignation or initiate employee off-boarding case",
    "shortName": "Initiate Exit",
    "description": "Submit an official employee resignation or initiate an HR-directed offboarding workflow.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/exit/initiate",
    "headers": [
      "x-legal-entity-id: 10",
      "Content-Type: application/json",
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "x-legal-entity-id",
        "value": "10"
      },
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [],
    "requestBody": "{\n  \"userId\": 196,\n  \"employee_name\": \"Santhosh Kumar\",\n  \"exit_type\": \"RESIGNATION\",\n  \"notice_date\": \"2026-10-28\",\n  \"last_working_day\": \"2026-12-05\",\n  \"primary_reason\": \"Career Advancement\",\n  \"explanation\": \"Transitioning to enterprise cloud architecture role\",\n  \"notice_waiver\": true,\n  \"acknowledged\": true,\n  \"interview_pref\": \"ONLINE\",\n  \"handover_notes\": \"All repositories and documentation handed over to dev leads.\",\n  \"assets\": [\n    {\n      \"name\": \"Lenovo ThinkPad P1 Gen 6\",\n      \"id\": \"PF-3949AX9\",\n      \"category\": \"Computing Devices\",\n      \"asset_id\": 28,\n      \"return_status\": false,\n      \"condition\": \"Good\"\n    },\n    {\n      \"name\": \"Dell 27-inch 4K Monitor\",\n      \"id\": \"DL-MON-9921\",\n      \"category\": \"Peripherals\",\n      \"return_status\": false,\n      \"condition\": \"Good\"\n    }\n  ]\n}",
    "requestBodyFields": [
      {
        "name": "userId",
        "type": "number",
        "required": true,
        "description": "Unique foreign-key identifier for user"
      },
      {
        "name": "employee_name",
        "type": "string",
        "required": true,
        "description": "Employee name"
      },
      {
        "name": "exit_type",
        "type": "string",
        "required": true,
        "description": "Exit type"
      },
      {
        "name": "notice_date",
        "type": "string",
        "required": true,
        "description": "Notice date"
      },
      {
        "name": "last_working_day",
        "type": "string",
        "required": true,
        "description": "Last working day"
      },
      {
        "name": "primary_reason",
        "type": "string",
        "required": true,
        "description": "Business justification or primary reason"
      },
      {
        "name": "explanation",
        "type": "string",
        "required": true,
        "description": "Explanation"
      },
      {
        "name": "notice_waiver",
        "type": "boolean",
        "required": true,
        "description": "Notice waiver"
      },
      {
        "name": "acknowledged",
        "type": "boolean",
        "required": true,
        "description": "Acknowledged"
      },
      {
        "name": "interview_pref",
        "type": "string",
        "required": true,
        "description": "Interview pref"
      },
      {
        "name": "handover_notes",
        "type": "string",
        "required": true,
        "description": "Handover notes"
      },
      {
        "name": "assets",
        "type": "array",
        "required": true,
        "description": "Assets"
      }
    ],
    "responses": [
      {
        "status": "201 Created",
        "code": 201,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/exit/initiate\" \\\n  -H \"x-legal-entity-id: 10\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -d '{\n    \"userId\": 196,\n    \"employee_name\": \"Santhosh Kumar\",\n    \"exit_type\": \"RESIGNATION\",\n    \"notice_date\": \"2026-10-28\",\n    \"last_working_day\": \"2026-12-05\",\n    \"primary_reason\": \"Career Advancement\",\n    \"explanation\": \"Transitioning to enterprise cloud architecture role\",\n    \"notice_waiver\": true,\n    \"acknowledged\": true,\n    \"interview_pref\": \"ONLINE\",\n    \"handover_notes\": \"All repositories and documentation handed over to dev leads.\",\n    \"assets\": [\n      {\n        \"name\": \"Lenovo ThinkPad P1 Gen 6\",\n        \"id\": \"PF-3949AX9\",\n        \"category\": \"Computing Devices\",\n        \"asset_id\": 28,\n        \"return_status\": false,\n        \"condition\": \"Good\"\n      },\n      {\n        \"name\": \"Dell 27-inch 4K Monitor\",\n        \"id\": \"DL-MON-9921\",\n        \"category\": \"Peripherals\",\n        \"return_status\": false,\n        \"condition\": \"Good\"\n      }\n    ]\n  }'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/exit/initiate\", {\n  method: \"POST\",\n  headers: {\n    \"x-legal-entity-id\": \"10\",\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify({\n    \"userId\": 196,\n    \"employee_name\": \"Santhosh Kumar\",\n    \"exit_type\": \"RESIGNATION\",\n    \"notice_date\": \"2026-10-28\",\n    \"last_working_day\": \"2026-12-05\",\n    \"primary_reason\": \"Career Advancement\",\n    \"explanation\": \"Transitioning to enterprise cloud architecture role\",\n    \"notice_waiver\": true,\n    \"acknowledged\": true,\n    \"interview_pref\": \"ONLINE\",\n    \"handover_notes\": \"All repositories and documentation handed over to dev leads.\",\n    \"assets\": [\n      {\n        \"name\": \"Lenovo ThinkPad P1 Gen 6\",\n        \"id\": \"PF-3949AX9\",\n        \"category\": \"Computing Devices\",\n        \"asset_id\": 28,\n        \"return_status\": false,\n        \"condition\": \"Good\"\n      },\n      {\n        \"name\": \"Dell 27-inch 4K Monitor\",\n        \"id\": \"DL-MON-9921\",\n        \"category\": \"Peripherals\",\n        \"return_status\": false,\n        \"condition\": \"Good\"\n      }\n    ]\n  })\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/exit/initiate\"\nheaders = {\n  \"x-legal-entity-id\": \"10\",\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\"\n}\npayload = {\n  \"userId\": 196,\n  \"employee_name\": \"Santhosh Kumar\",\n  \"exit_type\": \"RESIGNATION\",\n  \"notice_date\": \"2026-10-28\",\n  \"last_working_day\": \"2026-12-05\",\n  \"primary_reason\": \"Career Advancement\",\n  \"explanation\": \"Transitioning to enterprise cloud architecture role\",\n  \"notice_waiver\": true,\n  \"acknowledged\": true,\n  \"interview_pref\": \"ONLINE\",\n  \"handover_notes\": \"All repositories and documentation handed over to dev leads.\",\n  \"assets\": [\n    {\n      \"name\": \"Lenovo ThinkPad P1 Gen 6\",\n      \"id\": \"PF-3949AX9\",\n      \"category\": \"Computing Devices\",\n      \"asset_id\": 28,\n      \"return_status\": false,\n      \"condition\": \"Good\"\n    },\n    {\n      \"name\": \"Dell 27-inch 4K Monitor\",\n      \"id\": \"DL-MON-9921\",\n      \"category\": \"Peripherals\",\n      \"return_status\": false,\n      \"condition\": \"Good\"\n    }\n  ]\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "POST /api/exit/initiate HTTP/1.1\nHost: api.lattiumhr.com\nx-legal-entity-id: 10\nContent-Type: application/json\nAccept: application/json\n\n{\n  \"userId\": 196,\n  \"employee_name\": \"Santhosh Kumar\",\n  \"exit_type\": \"RESIGNATION\",\n  \"notice_date\": \"2026-10-28\",\n  \"last_working_day\": \"2026-12-05\",\n  \"primary_reason\": \"Career Advancement\",\n  \"explanation\": \"Transitioning to enterprise cloud architecture role\",\n  \"notice_waiver\": true,\n  \"acknowledged\": true,\n  \"interview_pref\": \"ONLINE\",\n  \"handover_notes\": \"All repositories and documentation handed over to dev leads.\",\n  \"assets\": [\n    {\n      \"name\": \"Lenovo ThinkPad P1 Gen 6\",\n      \"id\": \"PF-3949AX9\",\n      \"category\": \"Computing Devices\",\n      \"asset_id\": 28,\n      \"return_status\": false,\n      \"condition\": \"Good\"\n    },\n    {\n      \"name\": \"Dell 27-inch 4K Monitor\",\n      \"id\": \"DL-MON-9921\",\n      \"category\": \"Peripherals\",\n      \"return_status\": false,\n      \"condition\": \"Good\"\n    }\n  ]\n}"
    },
    "note": "userId identifies a user record; do not assume it is interchangeable with employeeId."
  },
  {
    "id": 53,
    "number": 53,
    "module": "Employee Offboarding",
    "moduleShortName": "Offboarding",
    "moduleId": "employee-offboarding",
    "name": "Fetch cases awaiting approval for the logged-in user's role",
    "shortName": "Approval Queue",
    "description": "Fetch separation and resignation requests awaiting approval for the authenticated user role.",
    "method": "GET",
    "endpointUrl": "{{baseUrl}}/api/exit/my-approval-queue?search=Arun",
    "headers": [
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [
      {
        "name": "search",
        "in": "query",
        "type": "string",
        "required": false,
        "description": "Filter query parameter (search=Arun)"
      }
    ],
    "requestBody": "Enabled query parameters: search=Arun\nSaved response examples:\n• List of pending requests in approver queue (200 OK)",
    "requestBodyFields": [],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X GET \\\n  \"{{baseUrl}}/api/exit/my-approval-queue?search=Arun\" \\\n  -H \"Accept: application/json\" \\\n  -d 'Enabled query parameters: search=Arun\n  Saved response examples:\n  • List of pending requests in approver queue (200 OK)'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/exit/my-approval-queue?search=Arun\", {\n  method: \"GET\",\n  headers: {\n    \"Accept\": \"application/json\"\n  },\n  body: JSON.stringify(Enabled query parameters: search=Arun\n  Saved response examples:\n  • List of pending requests in approver queue (200 OK))\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/exit/my-approval-queue?search=Arun\"\nheaders = {\n  \"Accept\": \"application/json\"\n}\npayload = Enabled query parameters: search=Arun\nSaved response examples:\n• List of pending requests in approver queue (200 OK)\n\nresponse = requests.get(url, headers=headers, json=payload)\nprint(response.json())",
      "http": "GET /api/exit/my-approval-queue?search=Arun HTTP/1.1\nHost: api.lattiumhr.com\nAccept: application/json\n\nEnabled query parameters: search=Arun\nSaved response examples:\n• List of pending requests in approver queue (200 OK)"
    },
    "note": null
  },
  {
    "id": 57,
    "number": 57,
    "module": "Employee Offboarding",
    "moduleShortName": "Offboarding",
    "moduleId": "employee-offboarding",
    "name": "Generate relieving and work experience letters",
    "shortName": "Generate Docs",
    "description": "Generate official employee relieving documentation and work experience certificates.",
    "method": "POST",
    "endpointUrl": "{{baseUrl}}/api/exit/:id/generate-docs",
    "headers": [
      "Content-Type: application/json",
      "Accept: application/json"
    ],
    "headersTable": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "type": "string | number",
        "required": true,
        "description": "id (example: 7)"
      }
    ],
    "requestBody": "{}",
    "requestBodyFields": [],
    "responses": [
      {
        "status": "200 OK",
        "code": 200,
        "body": "{\n  \"success\": true,\n  \"message\": \"Operation completed successfully\"\n}"
      },
      {
        "status": "401",
        "code": 401,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNAUTHORIZED\",\n  \"message\": \"Invalid credentials or expired JWT session token\"\n}"
      },
      {
        "status": "422",
        "code": 422,
        "body": "{\n  \"success\": false,\n  \"error\": \"UNPROCESSABLE_ENTITY\",\n  \"message\": \"Validation failed: required payload attributes missing or malformed\"\n}"
      }
    ],
    "codeSnippets": {
      "curl": "curl -X POST \\\n  \"{{baseUrl}}/api/exit/:id/generate-docs\" \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  -d '{}'",
      "js": "const response = await fetch(\"{{baseUrl}}/api/exit/:id/generate-docs\", {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n    \"Accept\": \"application/json\"\n  }\n});\nconst data = await response.json();",
      "python": "import requests\n\nurl = \"{{baseUrl}}/api/exit/:id/generate-docs\"\nheaders = {\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\"\n}\n\nresponse = requests.post(url, headers=headers)\nprint(response.json())",
      "http": "POST /api/exit/:id/generate-docs HTTP/1.1\nHost: api.lattiumhr.com\nContent-Type: application/json\nAccept: application/json"
    },
    "note": null
  }
];
