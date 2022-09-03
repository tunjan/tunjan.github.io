// Get ToC div
 toc = document.getElementById("ToC");
 
 //Add a header
 tocHeader = document.createElement("h1");
 tocHeader.innerText="";
 toc.appendChild(tocHeader);
 
 // Create a list for the ToC entries
 tocList = document.createElement("ol"); 
 
 // Get the h2 tags — ToC entries
 headers = document.getElementsByTagName("h2");

if (headers.length === 0) {
  toc.remove();
}

 // For each h2
 for (i = 0; i < headers.length; i++){
 
    // Create an id
    name = "h"+i;
    headers[i].id=name;
 
    // a list item for the entry
    tocListItem = document.createElement("li");    // a link for the h2
    tocEntry = document.createElement("a");
    tocEntry.setAttribute("href","#"+name);
    tocEntry.innerText=headers[i].innerText;
 
    tocListItem.appendChild(tocEntry);
    tocList.appendChild(tocListItem);
 }
 toc.appendChild(tocList);
