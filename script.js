const input = document.getElementById("ip-address");
const button = document.getElementById("button");
const ip = document.getElementById("ip");
const timeZone = document.getElementById("time-zone");
const locationData = document.getElementById("location");
const isp = document.getElementById("isp");
const country = document.getElementById("country");
const region = document.getElementById("region");
const proxy = document.getElementById("proxy");
const hosting = document.getElementById("hosting");
const zip = document.getElementById("zip");
const district = document.getElementById("district");
const continent = document.getElementById("continent");
const as = document.getElementById("as");
const asName = document.getElementById("as-name");

button.addEventListener("click", () => {
  let value = input.value;
  fetch(
    `http://ip-api.com/json/${value}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      ip.innerText = value;
      locationData.innerText = data.city;
      timeZone.innerText = data.timezone;
      isp.innerText = data.isp;
      country.innerText = data.country;
      region.innerText = data.regionName;
      proxy.innerText = data.proxy;
      hosting.innerText = data.hosting;
      continent.innerText = data.continent;
      zip.innerText = data.zip;
      if (data.district === "") {
        district.innerText = "N/A";
      } else {
        district.innerText = data.district;
      }
      input.value = "";
      as.innerText = data.as;
      asName.innerText = data.asname;
      let lon = data.lon;
      let lat = data.lat;

      let container = L.DomUtil.get("map");
      if (container != null) {
        container._leaflet_id = null;
      }

      let myMap = L.map("map").setView([lat, lon], 15);

      L.tileLayer(
        "https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=I5SqWSN2d7RHjnrQF9DK",
        {
          attribution:
            '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
          crossOrigin: true,
        }
      ).addTo(myMap);

      let marker = L.marker([lat, lon]).addTo(myMap);
    });
});
