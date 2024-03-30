const width = 1000;
const height = 700;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

const link = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"



const req = new XMLHttpRequest();
      req.open("GET",link, true);
      req.send();
      req.onload=function(){
        
        const json = JSON.parse(req.responseText);
        const dataset = json.data;
        console.log(dataset);
        
        var svg = d3.select("body").append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [0, 0, width, height])
          .attr("style", "max-width: 100%; height: auto;");
        
        svg.append("text")
          .text("Gross Domestic Product (Billions)")
          .attr("x",50)
          .attr("y",200)
          .attr("class","label");
        
        svg.append("text")
          .text("United States GDP")
          .attr("x", 300)
          .attr("y", 75)
          .style("font-size","50px");
        
        const x = d3.scaleUtc()
          .domain([new Date(d3.min(dataset,(d) => d[0])),
                   new Date(d3.max(dataset, (d) =>d[0]))
                  ])
          .range([marginLeft, width - marginRight]);
          
        
          const y = d3.scaleLinear()
          .domain([d3.min(dataset, (d) => d[1]), d3.max(dataset, (d) => d[1])])
          .range([height - marginBottom, marginTop]);
        
        
        var tooltip = d3.select("body")
          .append("div")
          .style("position", "absolute")
          .style("z-index", "10")
          .style("visibility", "hidden")
          .text("a simple tooltip")
          .attr("class","tooltip");
        
          svg.selectAll("rect")
            .data(dataset)
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x",(d,i) => (i)*3.4 + 40)
              .attr("width", 4)
              .attr("y", (d,i)=>(height-d[1]/28)-30)
              .attr("height", (d,i) => d[1]/28)
              .attr("fill", "green")
              .on("mouseover", function(d){tooltip.text(d[0].toLocaleString('en-US') + " " + (d[1]*1000000000).toLocaleString('en-Us',{style:'currency', currency:'USD'}) ); return tooltip.style("visibility", "visible");})
              .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
              .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
              
     
        svg.append("text")
          .text("More Information: http://www.bea.gov/national/pdf/nipaguid.pdf")
          .attr("x","550")
          .attr("y","698")
          .attr("font-size","12px");
          svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x));
        
          svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y));
        
        
        
        
      }
      
