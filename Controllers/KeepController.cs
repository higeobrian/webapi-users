using Microsoft.AspNetCore.Mvc;
using API_Users.Repositories;
using API_Users.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace API_Users.Controllers
{
  [Route("api/[controller]")]
  public class KeepController : Controller
  {
    private readonly KeepRepository _db;
    public KeepController(KeepRepository repo)
    {
      _db = repo;  
    }

    //create
    [HttpPost]
    [Authorize]
    public Keep CreateKeep([FromBody]Keep newKeep)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        newKeep.UserId = user.Identity.Name;
        return _db.CreateKeep(newKeep);
      }
      return null;
    }


    //get all 
    [HttpGet]
    public IEnumerable<Keep> GetAll()
    {
      return _db.GetAll();
    }


    //get by id
    [HttpGet("{id}")]
    public Keep GetById(int id)
    {
      return _db.GetbyKeepId(id);
    }


    //get by user
    [HttpGet("user/{id}")]
    public IEnumerable<Keep> GetByUserId(int id)
    {
      return _db.GetByUserId(id);
    }


    //edit 
    [HttpPut("{id}")]
    public Keep EditKeep(int id, [FromBody]Keep newKeep)
    {
      return _db.EditKeep(id, newKeep);
    }
  }
}

