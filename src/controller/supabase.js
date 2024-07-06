import {createClient} from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_PROJECT_URL, import.meta.env.VITE_API_KEY_SUPABASE);


export const signUpWithEmail = async (email, password, firstname, lastname) => {
  try {
    const {data, error} = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstname,
          last_name: lastname,
        }
      }
    })

    if (error){
      console.error(`${error.name} ${error.status}: ( Code: ${error.code} ) ( Message: ${error.message} )`)
      return error
    }

  }catch(error) {
    console.log(`signUpWithEmail [supabase]: ${error}`)
  }
}

export const signInWithEmail = async (email, password) => {
  try {
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (error) {
      return error
    } else {
      return data
    }
  } catch (error) {
    console.log(`signInWithEmail [supabase]: ${error}`)
  }
}