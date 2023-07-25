import { Types } from "mongoose";

const sampleDataOffering = {
  title: "Sample Data Offering",
  dataType: "CSV",
  dataSize: "10 MB",
  description: "This is a sample data offering.",
  identifier: "data-offering-123",
  license: "CC BY-NC",
  publisher: "Data Publisher Inc.",
  hasPolicy: ["Policy 1", "Policy 2"],
  keyword: [
    "https://raw.githubusercontent.com/Prometheus-X-association/reference-models/main/src/references/data-categories/hobbies.json",
  ],
  accrualPeriodicity: "Monthly",
  businessModel: "Pay-per-Use",
  landingPage: "https://www.example.com/data-offering",
  jsonld: "abc",
};

const sampleServiceOffering = {
  title: "Sample Service Offering",
  description: "This is a sample service offering.",
  landingPage: "https://www.example.com/service-offering",
  keyword: [
    "https://raw.githubusercontent.com/Prometheus-X-association/reference-models/main/src/references/service-categories/adaptiveLearning.json",
  ],
  distribution: ["Digital", "Web Service"],
  accrualPeriodicity: "Daily",
  subject: "Data Services",
  spatial: "Global",
  theme: "Data Analysis",
  temporalResolution: "Hourly",
  businessModel: "Subscription-based",
  license: "Open License",
  jsonld: "abc",
};

const sampleEcosystem = {
  name: "<string>",
  purposeAndGoals: {
    keyPurpose: "<string>",
    principles: ["<string>", "<string>"],
    useCases: ["<string>", "<string>"],
  },
  rolesAndResponsibilities: {
    stakeholders: [],
  },
  businessLogic: {
    businessModel: "<string>",
    payingParties: {
      direction: ["<string>", "<string>"],
      payers: ["<string>", "<string>"],
    },
    businessCase: {
      definition: "<string>",
    },
    ecosystemSharing: {
      role: "<string>",
      valueSharing: {
        businessModel: "<string>",
        valueNetwork: {
          direction: "<string>",
        },
        payers: ["<string>", "<string>"],
      },
      revenueModel: {
        businessModel: ["<string>", "<string>"],
        payingParties: {
          direction: ["<string>", "<string>"],
          payers: ["<string>", "<string>"],
        },
      },
      benefits: ["<string>", "<string>"],
      costs: ["<string>", "<string>"],
    },
  },
  dataValue: {
    pricingModel: "abc",
    dataValueSolution: {
      buildingBlock: "abc",
    },
    dataNetworkSolutions: [
      {
        type: "buy",
        pays: [],
      },
      {
        type: "rent",
        pays: [],
      },
    ],
    levelOfCommitment: ["<string>", "<string>"],
  },
  governance: {
    governancePrinciples: ["<string>", "<string>"],
    decisionModel: {
      perimeter: "<string>",
      decisionProcess: "<string>",
    },
  },
  dataServicesInfrastructure: {
    infrastructureServices: ["<string>", "<string>"],
    dataUsageControl: ["<string>", "<string>"],
    consentManagement: ["<string>", "<string>"],
    dataQuality: ["<string>", "<string>"],
    operationalMonitoring: ["<string>", "<string>"],
    issuesQuestions: "<string>",
    links: ["<string>", "<string>"],
  },
  systemDesignAndArchitecture: {
    systemPrinciples: {
      buildingBlocks: ["<string>", "<string>"],
      requirements: ["<string>", "<string>"],
      architecture: ["<string>", "<string>"],
    },
    metadataFormats: [
      {
        name: "<string>",
        link: "<string>",
      },
      {
        name: "<string>",
        link: "<string>",
      },
    ],
  },
  functionalRequirements: {
    technicalInterfaces: [
      {
        name: "<string>",
        link: "<string>",
        evolutionType: "<string>",
      },
      {
        name: "<string>",
        link: "<string>",
        evolutionType: "<string>",
      },
    ],
    acIdentities: ["<string>", "<string>"],
    dataUsageControlSolutions: ["<string>", "<string>"],
    transactionManagement: ["<string>", "<string>"],
    dataGovernanceSolution: ["<string>", "<string>"],
  },
  informationManagement: {
    dataServices: ["<string>", "<string>"],
    dataQuality: ["<string>", "<string>"],
  },
  security: {
    threatAssessment: {
      methods: ["<string>", "<string>"],
      standards: ["<string>", "<string>"],
      threats: ["<string>", "<string>"],
      securityObjectives: ["<string>", "<string>"],
    },
    riskManagementTools: ["<string>", "<string>"],
  },
  privacyAndPersonalData: {
    inclusionPersonalData: true,
    PersonalDataManagementSolution: ["<string>", "<string>"],
  },
  jsonld: "abc",
};

export const dataOfferings = {
  1: {
    ...sampleDataOffering,
    _id: new Types.ObjectId(1),
    title: "Test 1",
    theme: "Test theme 1",
    keyword: ["Keyword1", "Keyword2"],
  },
  2: {
    ...sampleDataOffering,
    _id: new Types.ObjectId(2),
    title: "Test 2",
    theme: "Test theme 2",
    keyword: ["Keyword3", "Keyword4"],
  },
};

export const serviceOfferings = {
  1: {
    ...sampleServiceOffering,
    _id: new Types.ObjectId(3),
    title: "Test 3",
    theme: "Test theme 3",
    keyword: ["Keyword5", "Keyword6"],
  },
  2: {
    ...sampleServiceOffering,
    _id: new Types.ObjectId(4),
    title: "Test 4",
    theme: "Test theme 4",
    keyword: ["Keyword7", "Keyword8"],
  },
};

export const ecosystems = {
  1: {
    ...sampleEcosystem,
    _id: new Types.ObjectId(5),
    needs: {
      data: [
        {
          theme: "",
          keyword: ["Keyword 1", "Keyword 2"],
        },
      ],
      services: [
        {
          theme: "",
          keyword: ["Keyword 5", "Keyword 6"],
        },
      ],
    },
  },
  2: {
    ...sampleEcosystem,
    _id: new Types.ObjectId(6),
    needs: {
      data: [
        {
          theme: "",
          keyword: ["Keyword 3", "Keyword 4"],
        },
      ],
      services: [
        {
          theme: "",
          keyword: ["Keyword 7", "Keyword 8"],
        },
      ],
    },
  },
};
