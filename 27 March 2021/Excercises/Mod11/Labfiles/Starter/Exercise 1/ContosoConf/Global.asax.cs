﻿using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ContosoConf
{
    public class Global : HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            RouteTable.Routes.MapRoute(
                "Default",
                "{controller}/{action}/{id}",
                new {id = UrlParameter.Optional}
            );
        }
    }
}