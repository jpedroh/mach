import { NextResponse } from 'next/server';

export const runtime = 'edge';

function getApiUrl() {
    if (process.env.VERCEL_ENV === "production") {
        return `https://${process.env.BASE_URL}/api`;
    }
    return `https://${process.env.VERCEL_URL}/api`;
}

const openApi = {
    openapi: "3.0.1",
    info: {
        title: "Mach",
        description: "An API to retrieve a timetable from Brazilian RPL - CGNA",
        contact: {
            email: "joao.pedro.hsd@gmail.com",
        },
        version: process.env.NEXT_PUBLIC_APP_VERSION,
    },
    servers: [
        {
            url: getApiUrl(),
        },
    ],
    tags: [
        {
            name: "Flight",
        },
    ],
    paths: {
        "/flights": {
            get: {
                tags: ["Flight"],
                summary: "Returns a list of Paginated Flights",
                parameters: [
                    {
                        in: "query",
                        name: "offset",
                        schema: {
                            type: "number",
                            default: 0,
                        },
                    },
                    {
                        in: "query",
                        name: "limit",
                        schema: {
                            type: "number",
                            default: 15,
                            minimum: 0,
                        },
                    },
                    {
                        in: "query",
                        name: "aircraftIcaoCode",
                        style: "form",
                        explode: true,
                        schema: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },
                    },
                    {
                        in: "query",
                        name: "company",
                        style: "form",
                        explode: true,
                        schema: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },
                    },
                    {
                        in: "query",
                        name: "departureIcao",
                        style: "form",
                        explode: true,
                        schema: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },
                    },
                    {
                        in: "query",
                        name: "arrivalIcao",
                        style: "form",
                        explode: true,
                        schema: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "A Paginated List of Flights",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/PaginatedFlights",
                                },
                            },
                        },
                    },
                    "500": {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/flights/all": {
            get: {
                tags: ["Flight"],
                summary: "Returns a list of Flights",
                parameters: [
                    {
                        in: "query",
                        name: "company",
                        style: "form",
                        explode: true,
                        schema: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },
                    },
                    {
                        in: "query",
                        name: "aircraftIcaoCode",
                        style: "form",
                        explode: true,
                        schema: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },
                    },
                    {
                        in: "query",
                        name: "departureIcao",
                        style: "form",
                        explode: true,
                        schema: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },
                    },
                    {
                        in: "query",
                        name: "arrivalIcao",
                        style: "form",
                        explode: true,
                        schema: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "A List of Flights",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Flight",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/flights/{id}": {
            get: {
                tags: ["Flight"],
                summary: "Get a flight by ID.",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                        required: true,
                    },
                ],
                responses: {
                    "200": {
                        description: "A flight object",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Flight",
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Flight not found",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                    "500": {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            Flight: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    callsign: {
                        type: "string",
                    },
                    beginDate: {
                        type: "string",
                        format: "date-time",
                    },
                    endDate: {
                        type: "string",
                        format: "date-time",
                        nullable: true,
                    },
                    company: {
                        type: "string",
                    },
                    flightNumber: {
                        type: "number",
                    },
                    aircraft: {
                        $ref: "#/components/schemas/Aircraft",
                    },
                    departureIcao: {
                        type: "string",
                    },
                    estimatedOffBlockTime: {
                        type: "string",
                    },
                    cruisingSpeed: {
                        type: "string",
                    },
                    weekdays: {
                        type: "array",
                        items: {
                            type: "string",
                            enum: [
                                "MONDAY",
                                "TUESDAY",
                                "WEDNESDAY",
                                "THURSDAY",
                                "FRIDAY",
                                "SATURDAY",
                                "SUNDAY",
                            ],
                        },
                    },
                    cruisingLevel: {
                        type: "number",
                    },
                    route: {
                        type: "string",
                    },
                    arrivalIcao: {
                        type: "string",
                    },
                    remarks: {
                        type: "string",
                    },
                    estimatedEnrouteMinutes: {
                        type: "number",
                    },
                    flightRules: {
                        type: "string",
                        enum: ["IFR", "Y", "Z"],
                    },
                    createdAt: {
                        type: "string",
                        format: "date-time",
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time",
                    },
                },
            },
            Aircraft: {
                type: "object",
                properties: {
                    icaoCode: {
                        type: "string",
                    },
                    wakeTurbulence: {
                        type: "string",
                        enum: ["LIGHT", "MEDIUM", "HEAVY", "SUPER"],
                    },
                    equipment: {
                        type: "string",
                    },
                },
            },
            PaginatedFlights: {
                type: "object",
                properties: {
                    count: {
                        type: "number",
                    },
                    items: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Flight",
                        },
                    },
                },
            },
            ErrorResponse: {
                type: "object",
                properties: {
                    status: {
                        type: "number",
                    },
                    message: {
                        type: "string",
                    },
                },
            },
        },
    },
};

export async function GET() {
    return NextResponse.json(openApi, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
};
