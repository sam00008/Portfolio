document.addEventListener('DOMContentLoaded', () => {
  if (window.tailwind) {
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#f0fdf4',
              500: '#22c55e',
              600: '#16a34a',
              900: '#052e16',
            },
            dark: {
              100: '#1e293b',
              200: '#0f172a',
              300: '#0b0f19',
            }
          }
        }
      }
    };
  }

  // DOM Elements
  const endpointSelect = document.getElementById('endpoint-select');
  const sendRequestBtn = document.getElementById('send-request-btn');
  const apiOutput = document.getElementById('api-output');
  const statusCode = document.getElementById('status-code');
  const responseTime = document.getElementById('response-time');

  const calcPackage = document.getElementById('calc-package');
  const calcEndpoints = document.getElementById('calc-endpoints');
  const calcAuth = document.getElementById('calc-auth');
  const calcDeploy = document.getElementById('calc-deploy');
  const endpointCount = document.getElementById('endpoint-count');
  const totalPrice = document.getElementById('total-price');

  // Live API Demo Interactive Logic
  function runApiDemo() {
    const type = endpointSelect.value;
    apiOutput.textContent = '// Dispatching MERN HTTP request...';

    setTimeout(() => {
      let payload = {};
      if (type === 'auth') {
        payload = {
          status: 200,
          message: "MERN JWT Token validated successfully",
          user: { id: "usr_99x82", role: "ADMIN", authenticated: true },
          tokenExpiry: "2026-12-31T23:59:59Z"
        };
      } else if (type === 'analytics') {
        payload = {
          status: 200,
          executionTime: "11ms",
          data: {
            totalRevenue: "$52,400.00",
            activeSessions: 114,
            mongodbPipeline: [
              { category: "Full-Stack Contracts", total: 36000 },
              { category: "API Integrations", total: 16400 }
            ]
          }
        };
      } else if (type === 'network') {
        payload = {
          status: 200,
          networkTopology: "LAN Client-Server Bridge",
          gatewayStatus: "ACTIVE",
          connectedClients: 8,
          apiGateway: "Google Gemini Proxy Active"
        };
      }

      statusCode.textContent = "200 OK";
      responseTime.textContent = Math.floor(Math.random() * 12 + 6) + "ms";
      apiOutput.textContent = JSON.stringify(payload, null, 2);
    }, 350);
  }

  // Dynamic Price Calculator
  function calculatePrice() {
    const basePackage = parseInt(calcPackage.value, 10);
    const endpointsCountVal = parseInt(calcEndpoints.value, 10);
    const hasAuth = calcAuth.checked ? 50 : 0;
    const hasDeploy = calcDeploy.checked ? 40 : 0;

    endpointCount.textContent = `${endpointsCountVal} Components`;

    const endpointCost = (endpointsCountVal - 1) * 15;
    const total = basePackage + endpointCost + hasAuth + hasDeploy;

    totalPrice.textContent = `$${total}`;
  }

  // Event Listeners
  if (sendRequestBtn) sendRequestBtn.addEventListener('click', runApiDemo);
  if (calcPackage) calcPackage.addEventListener('change', calculatePrice);
  if (calcEndpoints) calcEndpoints.addEventListener('input', calculatePrice);
  if (calcAuth) calcAuth.addEventListener('change', calculatePrice);
  if (calcDeploy) calcDeploy.addEventListener('change', calculatePrice);

  // Initial Calculation Run
  calculatePrice();
});