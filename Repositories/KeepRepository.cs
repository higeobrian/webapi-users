using System.Collections.Generic;
using System.Data;
using API_Users.Models;
using Dapper;

namespace API_Users.Repositories
{

public class KeepRepository : DbContext
  {
    public KeepRepository(IDbConnection db) : base(db)
    {

    }

    // Create Keep
    public Keep CreateKeep(Keep newKeep)
    {
      int id = _db.ExecuteScalar<int>(@"
                INSERT INTO keeps (title, description, imageUrl, userId, view, public)
                VALUES (@Title, @Description, @ImageUrl, @UserId, @View, @Public);
                SELECT LAST_INSERT_ID();
            ", newKeep);
      newKeep.Id = id;
      return newKeep;
    }

    // Get All Keep
    public IEnumerable<Keep> GetAll()
    {
      return _db.Query<Keep>("SELECT * FROM keeps WHERE public = 0;");
    }

    // Get by Userid
    public IEnumerable<Keep> GetByUserId(int id)
    {
      return _db.Query<Keep>("SELECT * FROM keeps WHERE UserId = @id;", new { id });
    }

    // Get by Id
    // public Keep GetbyKeepId(int id)
    // {
    //   return _db.QueryFirstOrDefault<Keep>("SELECT * FROM keeps WHERE id = @id;", new { id });
    // }

    // Edit
    public Keep EditKeep(int id, Keep keep)
    {
      keep.Id = id;
      keep.View++;
      var i = _db.Execute(@"
                UPDATE keeps SET
                    title = @Title,
                    description = @Description,
                    imageUrl = @ImageUrl,
                    view = @View,
                    public = @Public
                WHERE id = @Id
            ", keep);
      if (i > 0)
      {
        return keep;
      }
      return null;
    }

    // Delete 
    public bool DeleteKeep(int id, string userId)
    {
      var i = _db.Execute(@"
      DELETE FROM keeps
      WHERE id = @id
      LIMIT 1;
      ", new { id });
      if (i > 0)
      {
        return true;
      }
      return false;
    }

  }

}